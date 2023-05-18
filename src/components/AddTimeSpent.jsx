import { useState } from "react";
import { updateDataAPI } from "../assets/helpers/api.js";
import PropTypes from "prop-types";

function AddTimeSpent({ operationId, spentTime, setTasks, setTimeSpentId }) {
  const [value, setValue] = useState(0);

  async function handleUpdateOperation() {
    const date = await updateDataAPI(
      { timeSpent: value + spentTime },
      "operations",
      operationId,
      "PATCH"
    );

    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        operations: task.operations.map((operation) => {
          if (operation.id === operationId) {
            operation.timeSpent += value;
          }
          return operation;
        }),
      }))
    );
    setTimeSpentId(null);
  }

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.valueAsNumber)}
        type="number"
      />
      <button onClick={handleUpdateOperation}>Add</button>
      <button onClick={() => setTimeSpentId(null)}>Cancel</button>
    </>
  );
}
AddTimeSpent.propTypes = {
  operationId: PropTypes.number,
  spentTime: PropTypes.number,
  setTasks: PropTypes.func,
  seTimeSpentId: PropTypes.func,
};
export default AddTimeSpent;
