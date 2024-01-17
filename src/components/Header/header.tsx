import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Grow,
  Slide,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  getRandom as getRandomQuote,
  loadQuotes,
} from "../../features/quotesManager";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Quoteholder } from "../MainQuoteHolder/quote-holder";
import { useQuery } from "@apollo/client";
import { GET_QUOTES } from "../../dao/graphql-operations";
import { GetQuotesResponse } from "../../dao/interfaces";

const quoteStyle: CSSProperties = {
  color: "#FFFFF0",
  fontSize: 150,
  fontFamily: "Calibri serif",
  margin: 0,
};

const upperQuoteStyle: CSSProperties = {
  position: "static",
  bottom: -160,
};

const lowerQuoteStyle: CSSProperties = {
  position: "relative",
  textAlign: "right",
  bottom: 100,
  maxHeight: 20,
};

export const Header = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [startTransition, setStartTransition] = useState(false);
  const { randomQuote, quotes } = useAppSelector(
    (state) => state.quotesManager
  );
  const dispatch = useAppDispatch();

  const { data, loading } = useQuery<GetQuotesResponse>(GET_QUOTES, {
    fetchPolicy: "cache-and-network",
  });

  const startTransitionEffect = () => {
    setStartTransition(!startTransition);
  };

  const changeQuote = () => {
    setTimeout(() => {
      dispatch(getRandomQuote());
    }, 1000);
  };

  useEffect(() => {
    if (randomQuote.length === 0 && quotes.length > 0)
      dispatch(getRandomQuote());
  }, [randomQuote, quotes, dispatch]);

  useEffect(() => {
    if (!loading && data?.quotes) {
      dispatch(loadQuotes(data.quotes.map((quoteObj) => quoteObj.text)));
    }
  }, [data, loading, dispatch]);

  return (
    <Grid container justifyContent="center">
      <Grid xs={12}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            padding: 1,
            color: "#FFFFF0",
            "& .MuiAppBar-colorTransparent": {
              backgroundColor: "rgba(255, 255, 240, 0.2)",
            },
          }}
        >
          YOUR QUOTES
        </AppBar>
      </Grid>
      <Grid xs={10}>
        <div id="quote-1" style={{ ...quoteStyle, ...upperQuoteStyle }}>
          "
        </div>
        <Container maxWidth="xl" sx={{ marginTop: -20 }}>
          <Box
            sx={{
              bgcolor: "#2A3439",
              height: "50vh",
              borderRadius: 5,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              p: 2,
            }}
            ref={containerRef}
          >
            {loading || randomQuote === undefined ? (
              <CircularProgress />
            ) : (
              <Slide
                container={containerRef.current}
                in={!startTransition}
                direction={startTransition ? "right" : "left"}
                timeout={{ appear: 1700, enter: 1700, exit: 700 }}
                addEndListener={() => {
                  setTimeout(
                    () => {
                      startTransitionEffect();
                    },
                    startTransition ? 1000 : 5000
                  );
                  if (startTransition) changeQuote();
                }}
              >
                <div>
                  <Grow
                    timeout={{ appear: 1700, enter: 3700, exit: 700 }}
                    in={!startTransition}
                  >
                    <div>
                      <Quoteholder message={randomQuote} />
                    </div>
                  </Grow>
                </div>
              </Slide>
            )}
          </Box>
        </Container>
        <div id="quote-2" style={{ ...quoteStyle, ...lowerQuoteStyle }}>
          "
        </div>
      </Grid>
    </Grid>
  );
};
