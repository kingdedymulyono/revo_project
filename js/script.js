const buttons = document.querySelectorAll('.btn2');
const sendBtn = document.getElementById("sendBtn")
const btnf = document.getElementById("btnF")
const filterBox = document.getElementById("filterBox");
const filter = document.getElementById("filter");
const textInput = document.getElementById("textInput");
const deadlineInput = document.getElementById("deadlineInput");
const res = document.getElementById("res");

let listArray = [];
var i = 0;
var x = 0;

listArray.push({
    text: 'ambatukam',
    date: '2025-08-08',
    status: "Complete"
});
listArray.push({
    text: 'anakHytam',
    date: '2025-06-06',
    status: "Pending"
});
listArray.push({
    text: 'xixixi',
    date: '2025-06-06',
    status: "Deadline"
});
const showFilter = () => {
    if (x == 0) {
        filterBox.style.display = 'block'
        x = 1;
    } else {
        filterBox.style.display = 'none'
        x = 0
    }

}
var apalah;
const checkDeadline = () => {
    var D = new Date;
    var date = D.getDate();
    var year = D.getFullYear().toString();
    var month = D.getMonth();
    var realMonth = (month + 1).toString();
    apalah = (`${year}-0${realMonth}-0${date}`);
    console.log(apalah);
}
checkDeadline();
sendBtn.addEventListener("click", () => {
    sendData();
})
const sendData = () => {

    var textValue = textInput.value;
    var deadlineValue = deadlineInput.value;
    if (textValue == '' || deadlineValue == '') {
        alert("hytamm");
        console.log("apcb hytam")
    } else {
        listArray.push({
            text: textValue,
            date: deadlineValue,
            status: "Pending"
        })
        res.innerHTML = ''
        updList('all');
    }
}
const statusColor = (s) => { 
    if(s=='Complete'){
        return "bg-green-500"
    }else if(s=='Pending'){
        return "bg-yellow-500"
    }else if(s=='Deadline'){
        return "bg-red-500"
    }
}
filter.addEventListener("change", () => {
    var fValue = filter.value;
    var resId = 0;
    console.log(fValue)
    listArray.forEach((item) => {
        if (item.status==fValue) {
            // if(fValue=)
            res.innerHTML = `
            <tr>
        <td>
            <div class="flex flex-column gap-4 rowflex items-center justify-start">
                                    <input type="checkbox">
                                    <p class="text-left text-sm">${item.text}</p>
                                </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
            <i class="fa-solid fa-clock"></i>
            <span>
            ${item.status}
                        </span>
                        </button>
                        </td>
                        <td>
                        <button type="button" class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white">Delete</button>
                        </td>
                        </tr>
                        `
            resId += 1;
        }
    })
})
const updList = (filter) => {
    var resId = 0;
    listArray.forEach((item) => {
        if (filter == 'all') {
            res.innerHTML += `
            <tr>
        <td>
            <div class="flex flex-column gap-4 rowflex items-center justify-start">
                                    <input type="checkbox">
                                    <p class="text-left text-sm">${item.text}</p>
                                </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
            <i class="fa-solid fa-clock"></i>
            <span>
             ${item.status}
                        </span>
                        </button>
                        </td>
                        <td>
                        <button type="button" class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white">Delete</button>
                        </td>
                        </tr>
                        `
            resId += 1;
        } else {

            if (item.status === filter) {
                res.innerHTML += `
            <tr>
        <td>
            <div class="flex flex-column gap-4 rowflex items-center justify-start">
                                    <input type="checkbox">
                                    <p class="text-left text-sm">${item.text}</p>
                                    </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status bg-yellow-300 p-2 text-white rounded-lg">
            <i class="fa-solid fa-clock"></i>
            <span>
             ${item.status}
                        </span>
                        </button>
                        </td>
                        <td>
                        <button type="button" class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white">Delete</button>
                        </td>
                        </tr>
                        `
                resId += 1;
            }
        }
    })
}
updList('all');