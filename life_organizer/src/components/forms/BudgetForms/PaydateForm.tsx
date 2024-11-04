"use client";
import { useState } from "react";

import { DatePicker, Select, SelectItem, Tooltip } from "@nextui-org/react";
import {
  calculateNextPayBiMonthly,
  calculateNextPaydDays,
  calculateNextPayMonths,
  createPayDate,
} from "@/lib/actions/PostActions";
import Form from "@/components/common/Form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { today, getLocalTimeZone, DateField } from "@internationalized/date";

export default function PayDateForm({
  onClose,
  setRefresh,
  refresh,
}: {
  onClose: any;
  setRefresh: any;
  refresh: boolean;
}) {
  const router = useRouter();

  const [PPvalue, PPsetValue] = useState<string>(""); // Pay Period Type

  const handlePPSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    PPsetValue(e.target.value);
  };

  function submitPayDate(formData: FormData) {
    async function create() {
      const payDate = await createPayDate(formData);
      if (payDate?.rec_id) {
        // Calculate out next 10 pay periods
        for (let i = 1; i <= 10; i++) {
          if (payDate.pay_period_type === "weekly") {
            await calculateNextPaydDays(7);
          } else if (payDate.pay_period_type === "bi-weekly") {
            await calculateNextPaydDays(14);
          } else if (payDate.pay_period_type === "monthly") {
            await calculateNextPayMonths(1);
          } else if (payDate.pay_period_type === "bi-monthly") {
            await calculateNextPayBiMonthly(1);
          }
        }

        toast.success("Budget Added!!");
        onClose();
        setRefresh(!refresh);
      }
    }
    if (formData.get("pay_period_type") != "bi-monthly") {
      if (formData.get("pay_date") != "") {
        create();
      } else {
        toast.error("Please enter a valid date");
      }
    } else {
      if (
        formData.get("pay_date_one") != "" &&
        formData.get("pay_date_two") != ""
      ) {
        create();
      } else {
        toast.error("Please pick two valid dates");
      }
    }
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
          <Tooltip content="Please">
            <DatePicker
              name="pay_date"
              label="Date Of Previous Paycheck"
              labelPlacement="outside"
              description="Previous Paycheck Only"
              size="lg"
            />
          </Tooltip>
        ) : PPvalue == "bi-weekly" ? (
          <DatePicker
            name="pay_date"
            label="Date Of Previous PayCheck"
            labelPlacement="outside"
            isRequired
          />
        ) : PPvalue == "monthly" ? (
          <DatePicker
            name="pay_date"
            label="Date Of Previous PayCheck"
            labelPlacement="outside"
            isRequired
          />
        ) : PPvalue == "bi-monthly" ? (
          <>
            <DatePicker
              name="pay_date_one"
              label="Date Of Previous Paycheck"
              labelPlacement="outside"
              isRequired
            />
            <p>And</p>
            <DatePicker
              name="pay_date_two"
              label="Date Of Next PayCheck"
              labelPlacement="outside"
              isRequired
            />
          </>
        ) : (
          ""
        )}
      </Form>
    </>
  );
}
