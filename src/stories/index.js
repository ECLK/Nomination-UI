import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import DatePickers from "../components/DatePicker";
import Progress from "../components/Progress/Progress";
import Table from "../components/common/Table";

import { tableHeadings, tableData } from "./_data";

storiesOf("Table", module).add("default", () => (
  <Table headings={tableHeadings} rows={tableData} />
));

storiesOf("DatePicker", module).add("default", () => <DatePickers />);

storiesOf("Progress", module).add("default", () => <Progress />);
