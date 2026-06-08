console.log("========= Welcome to our shop =========")
console.log("================ Our Menu =============")

let max_qty = 50;
let min_qty = 0;

let item1_name = "Samosa";
let item1_price = 18;
let item1_qty = 0;
let item1_bill = 0;

let item2_name = "Tea...";
let item2_price = 10;
let item2_qty = 0;
let item2_bill = 0;

let item3_name = "Pizza.";
let item3_price = 80;
let item3_qty = 0;
let item3_bill = 0;

item1_qty = prompt("Enter "+item1_name+" quantity: ")
console.log("Enter "+item1_name+" quantity: "+item1_qty)
item1_bill = item1_price * item1_qty;

item2_qty = prompt("Enter "+item2_name+" quantity: ")
console.log("Enter "+item2_name+" quantity: "+item2_qty)
item2_bill = item2_price * item2_qty;

item3_qty = prompt("Enter "+item3_name+" quantity: ")
console.log("Enter "+item3_name+" quantity: "+item3_qty)
item3_bill = item3_price * item3_qty;

if(item1_qty > min_qty && item1_qty < max_qty ){
    if(item2_qty > min_qty && item2_qty < max_qty ){
        if(item3_qty > min_qty && item3_qty < max_qty ){
            console.log("Item\tQuantity\tPrice\tTotal")
            console.log("----------------------------")
            console.log(item1_name+"\t"+item1_qty+"\t\t\t"+item1_price+"\t\t"+item1_bill)
            console.log(`${item2_name}\t${item2_qty}\t\t\t${item2_price}\t\t${item2_bill}`)
            console.log(`${item3_name}\t${item3_qty}\t\t\t${item3_price}\t\t${item3_bill}`)

            console.log("----------------------------")
            console.log("Total bill: "+(item1_bill+item2_bill+item3_bill));

        }   
    }
}

