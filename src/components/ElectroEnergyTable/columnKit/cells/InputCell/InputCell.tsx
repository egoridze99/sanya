import React, {useState} from "react";
import {ElectroenergyItem} from "src/store/electroenergy/models/electroenergy.model";
import useOutsideClick from "src/utils/hooks/useOutsideClick";
import {TextInput} from "src/core/components";

import "./inputCell.scss";
import {observer} from "mobx-react-lite";

type MatrixCalculationInputCellProps = {
  item: ElectroenergyItem;
  field: string;
  onChange: (val: string) => void;
};

const InputCell: React.FC<MatrixCalculationInputCellProps> = ({
  item,
  onChange,
  field
}) => {
  const [isEditable, setIsEditable] = React.useState<boolean>(false);
  const inputRef = React.useRef(null);
  const [value, setValue] = useState(isNaN(item[field]) ? "" : item[field]);

  const onSubmit = () => {
    onChange(value);
    setIsEditable(false);
  };

  useOutsideClick(inputRef, onSubmit);

  return (
    <div className="InputCell InputCell_input">
      {isEditable ? (
        <div ref={inputRef}>
          <TextInput
            onChange={(val) => setValue(val)}
            value={value}
            className="InputCell-input"
            onSubmit={onSubmit}
            autoFocus={true}
          />
        </div>
      ) : (
        <div
          className="InputCell InputCell_text-editor"
          onClick={() => setIsEditable(true)}
        >
          <p className="InputCell-text" onClick={() => setIsEditable(true)}>
            {value}
          </p>
        </div>
      )}
    </div>
  );
};

export default observer(InputCell);
