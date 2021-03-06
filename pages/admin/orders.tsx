import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { IOrder, IUser } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Full Name", width: 300 },
  { field: "total", headerName: "Total amount", width: 300 },
  {
    field: "isPaid",
    headerName: "Pagada",
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Payed" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "Num. Items",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "Go to Order",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Go to Order
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Created At", width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={"Orders"}
      subTitle={"Orders maintenance"}
      icon={<ConfirmationNumberOutlined />}
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

export default OrdersPage;
