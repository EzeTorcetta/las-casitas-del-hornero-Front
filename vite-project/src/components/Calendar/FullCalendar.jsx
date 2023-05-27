// import { useState } from "react";
// import { DatePicker } from "@material-ui/pickers";

function FullCalendars() {
  const [state, setState] = useState(new Date());
  console.log(state);

  return (
    <>
      <DatePicker value={state} onChange={setState} />
    </>
  );
}

export default FullCalendars;
