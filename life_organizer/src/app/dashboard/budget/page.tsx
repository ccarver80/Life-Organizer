"use client";

import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import PayDateForm from "@/components/forms/BudgetForms/PaydateForm";
import { useEffect, useState } from "react";
import { getBudget } from "@/lib/actions/GetActions";

import { deleteBudget } from "@/lib/actions/DeleteActions";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  calculateNextPayBiMonthly,
  calculateNextPaydDays,
  calculateNextPayMonths,
} from "@/lib/actions/PostActions";

type Budget = {
  rec_id: number;
  pay_period_type: string;
  pay_dates: {
    rec_id: number;
    createdAt: Date;
    updatedAt: Date;
    userRec_id: number;
    pay_date: Date;
    amount: number | null;
    budgetRec_id: number;
  }[];
};

export default function Page() {
  const [hasBudget, setHasBudget] = useState<Budget>();
  const [prevPayDay, setPrevPayDate] = useState<Date>();
  const [nextPayDay, setNexPayDate] = useState<Date>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [refresh, setRefresh] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function findBuget() {
      const budget = await getBudget();
      if (budget) {
        setHasBudget(budget);
        for (let i = 0; i < budget?.pay_dates.length; i++) {
          if (budget?.pay_dates[i].pay_date > new Date()) {
            if (i != 0) {
              console.log(i);
              setPrevPayDate(budget.pay_dates[i - 1].pay_date);
            }
            setNexPayDate(budget.pay_dates[i].pay_date);
            break;
          }
        }
      }
    }
    findBuget();
  }, [refresh]);

  async function clickdeleteBudget() {
    const remove = await deleteBudget();
    if (remove?.message == "success") {
      toast.success("Budget Deleted!!");
      setHasBudget(undefined);
      setPrevPayDate(undefined);
      setNexPayDate(undefined);
    }
  }

  let daysRemaining;
  if (nextPayDay) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const today = new Date();
    // Convert dates to UTC to avoid timezone issues
    const utcDate1 = Date.UTC(
      nextPayDay.getFullYear(),
      nextPayDay.getMonth(),
      nextPayDay.getDate()
    );
    const utcDate2 = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    daysRemaining = Math.round(Math.abs((utcDate2 - utcDate1) / oneDay));
  }

  return (
    <div className="mx-auto w-full px-5 mt-10">
      {hasBudget ? (
        <>
          <div className="flex justify-between">
            <Button
              className="bg-red-400 text-white font-bold"
              onClick={clickdeleteBudget}
            >
              Delete Budget
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="mx-auto">
              <h3 className="font-bold text-2xl">
                Pay Period Type:
                <u className=" underline-offset-8">
                  {hasBudget.pay_period_type.charAt(0).toUpperCase() +
                    hasBudget.pay_period_type.slice(1)}
                </u>
              </h3>
            </div>
            <div className="flex mt-10 justify-evenly w-full font-bold">
              <h3>
                Current Pay Period:
                {prevPayDay?.toLocaleDateString("en-us", { timeZone: "UTC" })}
              </h3>
              <h3>Todays Date: {new Date().toLocaleDateString("en-us")}</h3>
              <div className="flex flex-col">
                <h3>
                  Next Pay Day:
                  {nextPayDay ? (
                    nextPayDay.toLocaleDateString("en-us", { timeZone: "UTC" })
                  ) : (
                    <Button
                      onClick={async () => {
                        // Calculate out next 10 pay periods
                        for (let i = 1; i <= 10; i++) {
                          if (hasBudget.pay_period_type === "weekly") {
                            await calculateNextPaydDays(7);
                          } else if (
                            hasBudget.pay_period_type === "bi-weekly"
                          ) {
                            await calculateNextPaydDays(14);
                          } else if (hasBudget.pay_period_type === "monthly") {
                            await calculateNextPayMonths(1);
                          } else if (
                            hasBudget.pay_period_type === "bi-monthly"
                          ) {
                            await calculateNextPayBiMonthly(1);
                          }
                        }
                        setRefresh(!refresh);
                      }}
                    >
                      Calculate Next 10 Pay Periods
                    </Button>
                  )}
                </h3>
                <p>Days Remaing: {daysRemaining}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Button onPress={onOpen}>Start Budget</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>
                    <PayDateForm
                      onClose={onClose}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  </ModalBody>
                  <ModalFooter className="flex justify-between">
                    <h3>
                      Todays Date:{" "}
                      {new Date().toLocaleDateString("en-us", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h3>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
