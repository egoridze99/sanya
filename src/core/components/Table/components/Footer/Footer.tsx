import React from "react";

import {FooterProps} from "../../types";

const Footer: React.FC<FooterProps> = ({render}) => {
  return render ? <div className="Table__Footer">{render()}</div> : <></>;
};

export default Footer;
