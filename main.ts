import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let mypin = 1234;

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: "Enter your pin code",
  },
]);
if (pinAnswer.pin === mypin) {
  console.log(chalk.greenBright("your pin code is correct"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "please select one option",
      type: "list",
      choices: ["checkBalance", "withDraw Amount"],
    },
  ]);
  if (operationAns.operation === "withDraw Amount") {
    let withDrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: "Select a withdraw method",
        choices: ["fast cash", "Enter Amount"],
      },
    ]);
    if (withDrawAns.withdrawMethod === "fast cash") {
      let fastcashAns = await inquirer.prompt([
        {
          name: "fastcash",
          type: "list",
          message: "Select Amount",
          choices: ["1000", "2000", "3000", "4000", "5000"],
        },
      ]);
      if (fastcashAns.fastcash > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= fastcashAns.fastcash;
        console.log(`${fastcashAns.fastcash} withdraw successfully`);
        console.log(`your remaining balance is :${myBalance}`);
      }
    } else if (withDrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          message: "Enter the amount to withdraw:",
          type: "number",
        },
      ]);
      if (amountAns.amount > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= amountAns.amount;
        console.log(`${amountAns.amount} withdraw successfully`);
        console.log(`your ramaining balance is ${myBalance}`);
      }
    }
  } else if (operationAns.operation) {
    console.log(` your Account Balance is : ${myBalance}`);
  }
} else {
  console.log(chalk.red("wrong pin code plz try again!"));
}
