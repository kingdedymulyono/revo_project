var buttons = document.querySelectorAll('.btn2');
var deleteBtn = document.querySelectorAll('.deleteBtn')

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
let xid = 0;
listArray.push({
    id: xid++,
    text: 'Default1',
    date: '2025-01-02',
    status: "Complete"
});
listArray.push({
    id: xid++,
    text: 'Default2',
    date: '2025-08-04',
    status: "Pending"
});
listArray.push({
    id: xid++,
    text: 'Default3',
    date: '2025-08-09',
    status: "Deadline"
});
const checkDeadline = () =>{
    var D = new Date;
    var date = D.getDate();
    var year = D.getFullYear().toString();
    var month = D.getMonth();
    var realMonth = (month + 1).toString();
    listArray.map((item)=>{
        if(item.date.substring(0,4)==year && item.date.substring(6,7)==realMonth && item.date.substring(9,10)==date){
            item.status='Deadline';
            console.table(listArray)
        } 
    })
}
window.addEventListener("DOMContentLoaded",()=>{
    checkDeadline();
    updList('all');
})
const showFilter = () => {
    if (x == 0) {
        filterBox.style.display = 'block'
        x = 1;
    } else {
        filterBox.style.display = 'none'
        x = 0
    }

}
// checkDeadline();
sendBtn.addEventListener("click", () => {
    sendData();
})
const sendData = () => {

    var textValue = textInput.value;
    var deadlineValue = deadlineInput.value;
    if (textValue == '' || deadlineValue == '') {
        Swal.fire({
            title: 'Error!',
            text: 'Please input a text or date',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    } else {
        listArray.push({
            id: xid++,
            text: textValue,
            date: deadlineValue,
            status: "Pending"
        })
        res.innerHTML = ''
        checkDeadline();
        updList('all');
        textInput.value = '';
        deadlineInput.value = '';
    }
}
const statusColor = (s) => {
    if (s == 'Complete') {
        return "bg-green-500"
    } else if (s == 'Pending') {
        return "bg-yellow-500"
    } else if (s == 'Deadline') {
        return "bg-red-500"
    }
}
const statusIcon = (s) => {
    if (s == 'Complete') {
        return "check"
    } else if (s == 'Pending') {
        return "clock"
    } else if (s == 'Deadline') {
        return "x"
    }
}
filter.addEventListener("change", () => {
    var fValue = filter.value;
    var resId = 0;
    console.log(fValue)
    res.innerHTML = ''
    listArray.forEach((item) => {
        if (fValue == 'all') {
            res.innerHTML += `
            <tr>
            <td>
            <div class="flex flex-column gap-4 rowflex items-center justify-start">
            <input 
            id=s${item.id}
            class="checkBtn"
            type="checkbox">
            <p class="text-left text-sm">${item.text}</p>
            </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
            <i class="fa-solid fa-${statusIcon(item.status)}"></i>
            <span>
            ${item.status}
            </span>
            </button>
            </td>
            <td>
            <id="${item.id}"
            button type="button" class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white deleteBtn">Delete</button>
            </td>
            </tr>
            `
            resId += 1;
        } else {

            if (item.status == fValue) {
                // if(fValue=)
                res.innerHTML += `
            <tr>
            <td>
            <div class="flex flex-column gap-4 rowflex items-center justify-start">
            <input 
            id=s${item.id}
            class="checkBtn"
            type="checkbox">
            <p class="text-left text-sm">${item.text}</p>
            </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
            <i class="fa-solid fa-${statusIcon(item.status)}"></i>
            <span>
            ${item.status}
            </span>
            </button>
            </td>
            <td>
            <id="${item.id}"
            button type="button" class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white deleteBtn">Delete</button>
            </td>
            </tr>
            `
                resId += 1;
            }
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
                                    <input 
                                    id=s${item.id}
                                    class="checkBtn"
                                    type="checkbox">
                                    <p class="text-left text-sm">${item.text}</p>
                                </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
            <i class="fa-solid fa-${statusIcon(item.status)}"></i>
            <span>
             ${item.status}
                        </span>
                        </button>
                        </td>
                        <td>
                        <button type="button" 
                        id="${item.id}"
                        class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white deleteBtn">Delete</button>
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
                                    <input 
                                    id=s${item.id}
                                    class="checkBtn"
                                    type="checkbox">
                                    <p class="text-left text-sm">${item.text}</p>
                                    </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
            <button type="button" class="status bg-yellow-300 p-2 text-white rounded-lg">
            <i class="fa-solid fa-${statusIcon(item.status)}"></i>
            <span>
             ${item.status}
                        </span>
                        </button>
                        </td>
                        <td>
                        <button type="button" 
                        id="${item.id}"
                        class="text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white deleteBtn">Delete</button>
                        </td>
                        </tr>
                        `
                resId += 1;
            }
        }
    })
}
// updList('all');

var sxi = 0
res.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        deleteItem(Number(e.target.id));
    }
    if (e.target.classList.contains("checkBtn")) {
        console.log(e.target.value)
        if (sxi == 0) {
            statusItem(e.target.id)
            console.table(listArray)
            sxi += 1;
        } else {
            statusItem(e.target.id)
            sxi = 0;
        }
    }
});

const deleteItem = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success"
            });
            id = Number(id)
            const index = listArray.findIndex(item => item.id === id);
            console.log(index)
            listArray.splice(index, 1);
            console.table(listArray)
            res.innerHTML = '';
            updList('all');
        }
    });

};

const statusItem = (id) => {
    id = id[1]
    listArray.map((item) => {
        if (item.id == id) {
            if (item.status == 'Pending') {
                item.status = 'Complete'
            } else {
                item.status = 'Pending'
            }
        }
    })
    console.table(listArray)
    res.innerHTML = '';
    updList('all');

}