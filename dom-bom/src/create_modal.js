async function getNotifications(){
    const stream = await fetch(`./notifications.json`);
    return stream.json();
}

function createPagination(amountOfNotifications, index){
    let btns = [];

    for(let i=0; i<amountOfNotifications; i++){
        btns.push(`<input type='radio' name='pagination' id='radioNotification-${i}' ${i === index ? 'checked' : ''}>`)
    }
    return `<div id='btnsRadio' class='btnsRadio'>${btns.join('')}</div>`;
}

export async function createNotificationsModal(){

    const notifications = await getNotifications();
    const root = document.getElementById(`root`);
    let currentNotification = JSON.parse(localStorage.getItem(`currentNotification`)) || 0;

    const modal = `
        <div id='modal' class="modal">
            <div class='modalWrapper'> 
                <div class="notification">
                        <h4 class="header">${notifications[currentNotification].title}</h4>
                        <p class="phrase">${notifications[currentNotification].phrase}</p>
                </div>
                <div>
                <button id="btnCloseModal">x</button>
                </div>
                <div id='modalFooter' class="modalFooter">
                    <div><input type="checkbox" id="disableNotifications">Disable Tips</div>
                    <div class="pagination">
                        <button id='btnPrevious'>&lt;</button>
                        ${createPagination(notifications.length, currentNotification)}
                        <button id='btnNext'>&gt;</button>
                    </div>
                </div>
            </div>
        </div>`;

    root.innerHTML = modal;

    const disableNotifications = document.getElementById(`disableNotifications`);
    const btnCloseModal = document.getElementById(`btnCloseModal`);
    
    function setItemsInLocalStorage(){
        if(disableNotifications.checked){
            localStorage.setItem('isNotificationsDisabled', 'true');
        }else{
            localStorage.setItem(`currentNotification`, `${currentNotification}`);
        }
    }

    btnCloseModal.addEventListener(`click`, () =>{
        setItemsInLocalStorage();
        root.firstElementChild.remove();
    })

    window.addEventListener(`unload`, setItemsInLocalStorage);

    const btnPrevious = document.getElementById(`btnPrevious`);
    const btnNext = document.getElementById(`btnNext`);
    const btnsRadio = document.getElementById(`btnsRadio`);
    const notification = document.querySelector(`.notification`);

    btnsRadio.addEventListener(`click`, (e) =>{
        let selectedIndex = e.target.id.split(`radioNotification-`)[1];
        updateNotification(selectedIndex);
    })

    function updateNotification(index){
        currentNotification = index;
        btnsRadio.children[index].checked = true;
        notification.children[0].innerHTML = notifications[index].title;
        notification.children[1].innerHTML = notifications[index].phrase;
    }
    
    btnPrevious.addEventListener(`click`, () => {
        let index = --currentNotification;
        if(index===-1){
            index = notifications.length - 1;
        }
        updateNotification(index);
    })

    btnNext.addEventListener(`click`, () => {
        let index = ++currentNotification;
        if(index === notifications.length){
            index = 0;
        }
        updateNotification(index);
    })
}