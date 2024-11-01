"use client";
import { useState } from "react";

import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { createPayDate } from "@/lib/actions/PostActions";
import Form from "@/components/common/Form";

export default function PayDateForm() {
  const [PPvalue, PPsetValue] = useState<string>(""); // Pay Period Type

  const handlePPSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    PPsetValue(e.target.value);
  };

  async function submitPayDate(formData: FormData) {
    // console.log(formData);
    const payDate = await createPayDate(formData);
    console.log(payDate);
  }

  return (
    <>
      <Form
        id="addPayDatetForm"
        formTitle="Start Budget"
        submitForm={submitPayDate}
        submitButtonName="Submit"
      >
        <Select
          name="pay_period_type"
          label="Select Pay Period Type"
          variant="bordered"
          placeholder="Pay Period Type"
          selectedKeys={[PPvalue]}
          className="max-w-xs"
          onChange={handlePPSelectionChange}
        >
          <SelectItem key="weekly">Weekly</SelectItem>
          <SelectItem key="bi-weekly">Bi-Weekly</SelectItem>
          <SelectItem key="monthly">Monthly</SelectItem>
          <SelectItem key="bi-monthly">Bi-Monthly</SelectItem>
        </Select>

        {PPvalue == "weekly" ? (
          <DatePicker
            name="pay_date"
            label="Paid Every Week Starting On"
            labelPlacement="outside"
          />
        ) : PPvalue == "bi-weekly" ? (
          <DatePicker
            name="pay_date"
            label="Paid Every OTHER Week Starting On"
            labelPlacement="outside"
          />
        ) : PPvalue == "monthly" ? (
          <DatePicker
            name="pay_date"
            label="Paid Every Month On"
            labelPlacement="outside"
          />
        ) : PPvalue == "bi-monthly" ? (
          <>
            <DatePicker
              name="pay_date_one"
              label="Paid Every Month On"
              labelPlacement="outside"
            />
            <p>And</p>
            <DatePicker name="pay_date_two" label="" labelPlacement="outside" />
          </>
        ) : (
          ""
        )}
      </Form>
    </>
  );
}
