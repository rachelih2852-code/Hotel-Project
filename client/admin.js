// =========================================================
// GLOBAL STATE
// =========================================================

let roomTypesList = [];   // תיכיל את כל סוגי החדרים שנטענו מהשרת
let roomsList = [];       // תכיל את כל החדרים שנטענו מהשרת
let editingRoomTypeId = null; // מזהה סוג החדר הנערך כרגע (null = מצב הוספה)
let editingRoomId = null;     // מזהה החדר הנערך כרגע (null = מצב הוספה)


// =========================================================
// NAVIGATION BETWEEN SECTIONS
// =========================================================

async function showRoomTypesSection() {
    //console.log('in')
    // תפקיד: להציג את הסקשן של "סוגי חדרים" ולהסתיר את שאר הסקשנים

    // צריך: להסיר class="hidden" מ- #roomTypesSection, להוסיף ל- #roomsSection
    document.querySelector('#roomTypesSection').classList.remove('hidden');
    document.querySelector('#roomsSection').classList.add('hidden');

    // צריך: לקרוא לפונקציה שטוענת את סוגי החדרים מהשרת (fetchRoomTypes)
    roomTypesList = await fetchRoomTypes();
    renderRoomTypesTable()
}

function showRoomsSection() {
    // תפקיד: להציג את הסקשן של "חדרים" ולהסתיר את שאר הסקשנים

    // צריך: להסיר class="hidden" מ- #roomsSection, להוסיף ל- #roomTypesSection
    document.querySelector('#roomsSection').classList.remove('hidden');
    document.querySelector('#roomTypesSection').classList.add('hidden');

    // צריך: לקרוא לפונקציה שטוענת את החדרים מהשרת (fetchRooms)
    fetchRooms();

    // צריך: לקרוא גם לפונקציה שטוענת את סוגי החדרים (כדי למלא את ה-select בטופס)
    fetchRoomTypes();
}


// =========================================================
// ROOM TYPES - FETCH & RENDER
// =========================================================

async function fetchRoomTypes() {
    // תפקיד: לשלוף מהשרת (GET) את כל סוגי החדרים
    // צריך: לקרוא ל-API המתאים (getAllRoomTypes), לשמור את התוצאה במשתנה roomTypesList
    try {
        //alert("in fetchGetRoomTypes")

        const respons = await fetch(`http://localhost:3000/getAllRoomTypes`,{
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json'
            },
        });

        const result = await respons.json();

        if(result.successed)
        {
            console.log('success',result.message);
            console.log('Data',result.data);
            roomTypesList = result.data
            return result.data;
        }
        else {
            console.error('failed!', result.message);
            if (result.error) console.error('Ditails', result.error);
        }
    }
    catch (error) {
        console.error('error with server connection', error.message);
    }

    // צריך: לקרוא לפונקציה renderRoomTypesTable() בסיום
    // 
}

function renderRoomTypesTable() {
    // תפקיד: לצייר את שורות הטבלה של סוגי החדרים בתוך #roomTypesTableBody
    // צריך: לעבור על roomTypesList וליצור שורת <tr> לכל סוג חדר
    // צריך: בכל שורה - כפתור עריכה שקורא ל-openEditRoomTypeModal(id)
    // צריך: בכל שורה - כפתור מחיקה שקורא ל-deleteRoomType(id)
    const table = document.querySelector('roomTypesTable')
    let tbody = document.createElement('tbody')

    const roomTypes = roomTypesList;

    if (!roomTypes)
        return;
    roomTypes.forEach(rt => {
        let tr = document.createElement('tr');

        const arr = ['sort','maxguests','base_price','descriotion']

        for(let i=0; i<arr.length; i++)
        {
            let td = document.createElement('td');
            td.innerText = rt[arr[i]]
            tr.append(td);
        }

        tbody.appendChild(tr);
    });
    table.append(tbody);
}


// =========================================================
// ROOM TYPES - MODAL (ADD / EDIT)
// =========================================================

function openAddRoomTypeModal() {

    // תפקיד: לפתוח את המודל להוספת סוג חדר חדש

    // צריך: לאפס את editingRoomTypeId ל-null
    editingRoomTypeId = null;

    // צריך: לנקות את שדות הטופס (roomTypeName, roomTypeMaxGuests וכו')
    document.querySelector('#roomTypeName').value = '';
    document.querySelector('#roomTypeMaxGuests').value = '';
    document.querySelector('#roomTypeBasePrice').value = '';
    document.querySelector('#roomTypeDescription').value = '';

    // צריך: לשנות את הכותרת של המודל ל"הוספת סוג חדר"
    document.querySelector('#roomTypeModalTitle').innerText = 'הוספת סוג חדר';

    // צריך: להסיר class="hidden" מ- #roomTypeModal
    document.querySelector('#roomTypeModal').classList.remove('hidden');
}

function openEditRoomTypeModal(id) {
    // תפקיד: לפתוח את המודל במצב עריכה, עם נתונים קיימים
    // צריך: למצוא בתוך roomTypesList את הסוג עם ה-id הזה
    // צריך: למלא את שדות הטופס עם הנתונים הקיימים
    // צריך: לשמור את ה-id בתוך editingRoomTypeId
    // צריך: לשנות את הכותרת של המודל ל"עריכת סוג חדר"
    // צריך: להסיר class="hidden" מ- #roomTypeModal
}

function closeRoomTypeModal() {
    // תפקיד: לסגור את המודל של סוג חדר
    // צריך: להוסיף class="hidden" ל- #roomTypeModal
}

async function saveRoomType(event) {
    // תפקיד: פונקציה שרצה כאשר שולחים את #roomTypeForm (submit)
    // צריך: event.preventDefault() כדי למנוע רענון דף
    // צריך: לקרוא את הערכים מהשדות (roomTypeName, roomTypeMaxGuests, roomTypeBasePrice, roomTypeDescription)
    // צריך: אם editingRoomTypeId ריק - לשלוח בקשת POST (יצירה חדשה)
    // צריך: אם editingRoomTypeId לא ריק - לשלוח בקשת PUT/PATCH (עדכון קיים)
    // צריך: אחרי הצלחה - לסגור את המודל ולרענן את הטבלה (fetchRoomTypes)
}

async function deleteRoomType(id) {
    // תפקיד: מחיקת סוג חדר
    // צריך: לבקש אישור מהמשתמש (confirm)
    // צריך: לשלוח בקשת DELETE לשרת עם ה-id
    // צריך: אחרי הצלחה - לרענן את הטבלה (fetchRoomTypes)
}


// =========================================================
// ROOMS - FETCH & RENDER
// =========================================================

async function fetchRooms() {
    // תפקיד: לשלוף מהשרת (GET) את כל החדרים
    // צריך: לקרוא ל-API המתאים (getAllRooms), לשמור את התוצאה במשתנה roomsList
    // צריך: לקרוא לפונקציה renderRoomsTable() בסיום
}

function renderRoomsTable() {
    // תפקיד: לצייר את שורות הטבלה של החדרים בתוך #roomsTableBody
    // צריך: לעבור על roomsList וליצור שורת <tr> לכל חדר
    // צריך: להציג את שם סוג החדר (ולא רק את ה-id שלו) - יש להצליב מול roomTypesList
    // צריך: בכל שורה - כפתור עריכה שקורא ל-openEditRoomModal(id)
    // צריך: בכל שורה - כפתור מחיקה שקורא ל-deleteRoom(id)
}

function populateRoomTypeSelect() {
    // תפקיד: למלא את ה- <select id="roomTypeSelect"> בתוך מודל החדר
    // צריך: לעבור על roomTypesList וליצור <option> לכל סוג חדר
}


// =========================================================
// ROOMS - MODAL (ADD / EDIT)
// =========================================================

function openAddRoomModal() {
    // תפקיד: לפתוח את המודל להוספת חדר חדש
    // צריך: לאפס את editingRoomId ל-null
    // צריך: לנקות את שדות הטופס (roomNumber, roomFloor, roomIsActive)
    // צריך: לקרוא ל-populateRoomTypeSelect() כדי למלא את רשימת סוגי החדרים
    // צריך: לשנות את הכותרת של המודל ל"הוספת חדר"
    // צריך: להסיר class="hidden" מ- #roomModal
}

function openEditRoomModal(id) {
    // תפקיד: לפתוח את המודל במצב עריכה, עם נתונים קיימים
    // צריך: למצוא בתוך roomsList את החדר עם ה-id הזה
    // צריך: לקרוא ל-populateRoomTypeSelect() ואז לבחור את הסוג המתאים
    // צריך: למלא את שדות הטופס עם הנתונים הקיימים
    // צריך: לשמור את ה-id בתוך editingRoomId
    // צריך: לשנות את הכותרת של המודל ל"עריכת חדר"
    // צריך: להסיר class="hidden" מ- #roomModal
}

function closeRoomModal() {
    // תפקיד: לסגור את המודל של חדר
    // צריך: להוסיף class="hidden" ל- #roomModal
}

async function saveRoom(event) {
    // תפקיד: פונקציה שרצה כאשר שולחים את #roomForm (submit)
    // צריך: event.preventDefault() כדי למנוע רענון דף
    // צריך: לקרוא את הערכים מהשדות (roomNumber, roomTypeSelect, roomFloor, roomIsActive)
    // צריך: אם editingRoomId ריק - לשלוח בקשת POST (יצירה חדשה)
    // צריך: אם editingRoomId לא ריק - לשלוח בקשת PUT/PATCH (עדכון קיים)
    // צריך: אחרי הצלחה - לסגור את המודל ולרענן את הטבלה (fetchRooms)
}

async function deleteRoom(id) {
    // תפקיד: מחיקת חדר
    // צריך: לבקש אישור מהמשתמש (confirm)
    // צריך: לשלוח בקשת DELETE לשרת עם ה-id
    // צריך: אחרי הצלחה - לרענן את הטבלה (fetchRooms)
}


// =========================================================
// EVENT LISTENERS
// =========================================================

// document.getElementById('roomTypeForm').addEventListener('submit', saveRoomType);
// document.getElementById('roomForm').addEventListener('submit', saveRoom);

// =========================================================
// ROOM IMAGES
// =========================================================

function handleRoomImagesPreview() {
    // תפקיד: להריץ כאשר המשתמש בוחר קבצים ב- #roomImages
    // צריך: להאזין ל-event 'change' על #roomImages
    // צריך: לעבור על כל קובץ שנבחר (event.target.files)
    // צריך: ליצור עבור כל קובץ תגית <img> עם תצוגה מקדימה (URL.createObjectURL(file))
    // צריך: להוסיף כל <img> לתוך #imagePreviewContainer
}