import { FC } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          // background: "red",
          // position: "fixed",
          // bottom: 0,
          width: "100%",
          padding: "0px 30px",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ width: "100%", padding: "20px 0px" }}
        >
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>

          <Box
            display="flex"
            justifyContent="space-around"
            sx={{ maxWidth: "400px", width: "100%" }}
          >
            <NextLink href="/category/men" passHref>
              <Link>Men</Link>
            </NextLink>
            <NextLink href="/category/women" passHref>
              <Link>Women</Link>
            </NextLink>
            <NextLink href="/category/kid" passHref>
              <Link>Kids</Link>
            </NextLink>
          </Box>

          <Box
            display="flex"
            justifyContent="space-around"
            sx={{ maxWidth: "500px", width: "100%" }}
          >
            <NextLink href="" passHref>
              <Link>
                <FacebookOutlined />
              </Link>
            </NextLink>
            <NextLink href="" passHref>
              <Link>
                <Twitter />
              </Link>
            </NextLink>
            <NextLink href="" passHref>
              <Link>
                <Instagram />
              </Link>
            </NextLink>

            <NextLink href="" passHref>
              <Link>
                <WhatsApp />
              </Link>
            </NextLink>
          </Box>

          <Typography variant="caption" sx={{ mt: 1 }}>
            © 2022 Teslo Shop. All rights reserved.
          </Typography>
        </Box>
      </footer>
    </>
  );
};
