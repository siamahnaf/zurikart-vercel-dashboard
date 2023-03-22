import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "Theme";
import createEmotionCache from "Emotion";

//Progress
import NextProgress from "next-progress";

//Redux Wrapper
import { wrapper } from "Redux/Store";
import { useAppSelector } from "Redux/Hook";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { error } = useAppSelector(state => state.serverError);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextProgress
          delay={2000}
          options={{ showSpinner: false }}
          color="#eb5525"
        />
        <Component {...pageProps} />
        {/* {error ? (
          <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", whiteSpace: "nowrap" }}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
              500 - Internal Server Error
            </Typography>
            <Typography variant="body2" component="p">
              There is a problem with the resource you are looking for or server response and it can&apos; be displayed.
            </Typography>
          </Box>
        ) : (
          <Component {...pageProps} />
        )} */}
      </ThemeProvider>
    </CacheProvider>
  );
}
export default wrapper.withRedux(MyApp);