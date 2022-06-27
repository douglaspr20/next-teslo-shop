import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { PeopleOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layouts";
import useSWR from "swr";
import { FullScreenLoading } from "../../components/ui";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/user");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!error && !data) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <Typography>Error loading information</Typography>;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }));

    setUsers(updatedUsers);
    try {
      await tesloApi.put("/admin/user", { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
      alert(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Full Name", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map(({ _id, email, name, role }) => ({
    id: _id,
    email,
    name,
    role,
  }));

  return (
    <AdminLayout
      title="Users"
      subTitle="User maintenance"
      icon={<PeopleOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
