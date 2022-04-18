import React, {ReactText} from "react";
import {CheckBox} from "../CheckBox";
import useOutsideClick from "src/utils/hooks/useOutsideClick";
import {TextInput} from "../TextInput";
import "./multiSelect.scss";

export type MultiSelectItem = {
  title?: string;
  value: string | number;
  render?: React.ReactNode;
};

type MultiSelectProps = {
  data: MultiSelectItem[];
  values: MultiSelectItem["value"][];
  onChange: (
    val: MultiSelectItem["value"][],
    canged?: MultiSelectItem["value"]
  ) => void;
  placeholder?: string;
  single?: boolean;
  maxVisible?: number | null;
};

export const MultiSelect: React.FC<MultiSelectProps> = React.memo(
  ({
    data = [],
    values = [],
    onChange,
    placeholder = "",
    single = false,
    maxVisible = null
  }) => {
    const wrapperRef = React.useRef(null);
    const [filterText, setFilterText] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    useOutsideClick(wrapperRef, () => setVisible(false));

    const filteredData = React.useMemo(() => {
      const filtered = [
        ...data.filter(({title = ""}) =>
          title
            ? title.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
            : false
        )
      ];
      if (maxVisible !== null) {
        return filtered.slice(0, maxVisible);
      }
      console.log("filtered", filtered);
      return filtered;
    }, [data, filterText, maxVisible]);

    const handleFilterChange = (val = "") => setFilterText(val);

    const selectedText = React.useMemo(() => {
      if (values.length === 0) return placeholder;
      const selected = data
        .filter(({value}) => values.includes(value))
        .map(({title}) => title);
      return `${selected[0]}${
        selected.length > 1 ? ` и ещё ${selected.length - 1}` : ""
      }`;
    }, [placeholder, values, data]);

    const handleChange = React.useCallback(
      (val?: ReactText) => {
        if (!!val) {
          const valIndex = values.indexOf(val);
          const newValues = [...(single ? [] : values)];
          if (valIndex >= 0) {
            if (single) {
              newValues.length = 0;
            } else {
              newValues.splice(valIndex, 1);
            }
          } else {
            newValues.push(val);
          }
          onChange(newValues, val);
        }
      },
      [values, onChange, single]
    );

    return (
      <div className="MultiSelect" ref={wrapperRef}>
        <div className="MultiSelect__input" onClick={() => setVisible(true)}>
          {selectedText}
        </div>
        {visible && (
          <div className="MultiSelect__body">
            <TextInput
              value={filterText}
              onChange={handleFilterChange}
              placeholder={placeholder}
            />
            <div className="MultiSelect__items" id="test">
              {filteredData.length > 0 ? (
                filteredData.map(({value, title, render}) => (
                  <div
                    key={`chbx--${value}`}
                    className="MultiSelect__items-checkbox-container"
                  >
                    <CheckBox
                      onChange={handleChange}
                      checked={values.indexOf(value) >= 0}
                      label={render || title}
                      value={value}
                      checkBoxType="secondary"
                    />
                  </div>
                ))
              ) : (
                <div className="MultiSelect__no-result">Нет результатов</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
