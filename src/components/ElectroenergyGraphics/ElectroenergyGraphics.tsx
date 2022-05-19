import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {Button} from "src/core/components";

import "./electroenergyGraphics.scss";

type ElectroenergyGraphicsProps = {
  calculateGraphicsData: () => {
    SAIDI: Highcharts.Options;
    SAIFI: Highcharts.Options;
    SAIFIAbs: Highcharts.Options;
    SAIDIAbs: Highcharts.Options;
    ENS: Highcharts.Options;
    Tok: Highcharts.Options;
  };
};

const ElectroenergyGraphics: React.FC<ElectroenergyGraphicsProps> = ({
  calculateGraphicsData
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [saifiOptions, setSaifiOptions] = React.useState<Highcharts.Options>(
    {}
  );
  const [saidiOptions, setSaidiOptions] = React.useState<Highcharts.Options>(
    {}
  );
  const [saifiAbsOptions, setSaifiAbsOptions] =
    React.useState<Highcharts.Options>({});
  const [saidiAbsOptions, setSaidiAbsOptions] =
    React.useState<Highcharts.Options>({});
  const [ENSOptions, setEnsOptions] = React.useState<Highcharts.Options>({});
  const [TokOptions, setTokOptions] = React.useState<Highcharts.Options>({});

  const setGraphicsData = () => {
    const {SAIFI, SAIDI, SAIFIAbs, SAIDIAbs, Tok, ENS} =
      calculateGraphicsData();

    setIsVisible(true);
    setSaifiOptions(SAIFI);
    setSaidiOptions(SAIDI);
    setSaifiAbsOptions(SAIFIAbs);
    setSaidiAbsOptions(SAIDIAbs);
    setEnsOptions(ENS);
    setTokOptions(Tok);
  };

  return (
    <div className="ElectroenergyGraphics">
      <div className="ElectroenergyGraphics__calculate-buttons">
        <div className="ElectroenergyGraphics__item">
          <Button content={"Построить графики"} onClick={setGraphicsData} />
        </div>
        <div className="ElectroenergyGraphics__item">
          <Button
            content={"Очистить графики"}
            onClick={() => setIsVisible(false)}
          />
        </div>
      </div>
      {isVisible && (
        <div className="ElectroenergyGraphics__graphics">
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact highcharts={Highcharts} options={saifiOptions} />
          </div>
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact highcharts={Highcharts} options={saidiOptions} />
          </div>
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact
              highcharts={Highcharts}
              options={saifiAbsOptions}
            />
          </div>
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact
              highcharts={Highcharts}
              options={saidiAbsOptions}
            />
          </div>
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact highcharts={Highcharts} options={ENSOptions} />
          </div>
          <div className={"ElectroenergyGraphics__item"}>
            <HighchartsReact highcharts={Highcharts} options={TokOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectroenergyGraphics;
