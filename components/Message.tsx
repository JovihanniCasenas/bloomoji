import { TextField } from "@mui/material";

export default function Message({message, onChangedMessage}: {message: string, onChangedMessage: (message: string) => void}) {
  const MAX_CHARS = 60;

  return (
    <div className="w-full">
      <TextField
        id="outlined-multiline-static"
        label="Message on the card"
        multiline
        rows={2}
        sx={{
            width: "100%",
        }}
        value={message}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARS) {
            onChangedMessage(e.target.value);
          }
        }}
        slotProps={{
          htmlInput: {
            maxLength: MAX_CHARS,
          },
        }}
        helperText={`${message.length}/${MAX_CHARS} characters`}
      />
    </div>
  );
}
