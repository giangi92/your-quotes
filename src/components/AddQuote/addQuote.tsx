import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  FormHelperText,
  Grow,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { addQuote } from "../../features/quotesManager";
import { useAppDispatch } from "../../store/hooks";

export const AddQuote = () => {
  const [addQuoteMode, setAddQuoteMode] = useState<boolean>(false);
  const [newQuote, setNewQuote] = useState("");
  const [helperText, setHelperText] = useState("");
  const dispatch = useAppDispatch();

  const changeMode = () => {
    setAddQuoteMode(!addQuoteMode);
  };

  const saveQuote = () => {
    if (newQuote.trim().length > 0) {
      setHelperText("");
      dispatch(addQuote({ quote: newQuote }));
      changeMode();
    } else {
      setHelperText("Field must not be empty");
    }
  };

  return (
    <Grid2 container alignContent={"center"} justifyContent={"center"}>
      {addQuoteMode && (
        <Grid2 xs={"auto"}>
          <Grow
            in={addQuoteMode}
            timeout={{ enter: 700, exit: 700 }}
            style={{}}
          >
            <Grid2 container alignItems={"center"} spacing={2}>
              <Grid2 xs={8}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  multiline
                  required
                  rows={5}
                  sx={{ backgroundColor: "whitesmoke", borderRadius: 3 }}
                  placeholder="Insert your quote here"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewQuote(event.target.value);
                  }}
                />
                <FormHelperText error>{helperText}</FormHelperText>
              </Grid2>
              <Grid2 xs={4}>
                <Grid2 container direction={"column"} spacing={2}>
                  <Grid2>
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={saveQuote}
                    >
                      Send
                    </Button>
                  </Grid2>
                  <Grid2>
                    <Button onClick={changeMode}>
                      <Typography>Cancel</Typography>
                    </Button>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grow>
        </Grid2>
      )}
      {!addQuoteMode && (
        <Grid2 xs={"auto"}>
          <Grow timeout={{ enter: 700, exit: 700 }} in={!addQuoteMode}>
            <Tooltip title="Add your quote">
              <IconButton color="primary" onClick={changeMode}>
                <ControlPointIcon sx={{ fontSize: 120 }} />
              </IconButton>
            </Tooltip>
          </Grow>
        </Grid2>
      )}
    </Grid2>
  );
};
