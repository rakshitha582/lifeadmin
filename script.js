```javascript
/* =========================================================
   LIFEADMIN - COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DATA STORAGE
   ========================================================= */

let bills = JSON.parse(localStorage.getItem("lifeadmin_bills")) || [];

let subscriptions =
    JSON.parse(
        localStorage.getItem("lifeadmin_subscriptions")
    ) || [];

let appointments =
    JSON.parse(
        localStorage.getItem("lifeadmin_appointments")
    ) || [];


/* =========================================================
   2. SAVE DATA
   ========================================================= */

function saveBills() {

    localStorage.setItem(
        "lifeadmin_bills",
        JSON.stringify(bills)
    );

}


function saveSubscriptions() {

    localStorage.setItem(
        "lifeadmin_subscriptions",
        JSON.stringify(subscriptions)
    );

}


function saveAppointments() {

    localStorage.setItem(
        "lifeadmin_appointments",
        JSON.stringify(appointments)
    );

}


/* =========================================================
   3. MODALS
   ========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.add("show");

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

    }

}


/* Close modal when clicking outside */

window.addEventListener("click", function(event) {

    if (
        event.target.classList &&
        event.target.classList.contains("modal")
    ) {

        event.target.classList.remove("show");

    }

});


/* =========================================================
   4. SUBSCRIPTIONS
   ========================================================= */

function displaySubscriptions() {

    const list =
        document.getElementById(
            "subscriptionList"
        );

    if (!list) return;


    list.innerHTML = "";


    if (subscriptions.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>No subscriptions yet</h3>

                <p>
                    Add your first subscription
                    to start tracking recurring payments.
                </p>

            </div>

        `;

        updateSubscriptionSummary();

        return;

    }


    subscriptions.forEach(function(subscription) {

        const card =
            document.createElement("div");

        card.className = "subscription-card card";


        card.innerHTML = `

            <div class="card-top">

                <div>

                    <span class="category-badge">
                        ${escapeHTML(subscription.category)}
                    </span>

                    <h3>
                        ${escapeHTML(subscription.name)}
                    </h3>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteSubscription('${subscription.id}')">

                    ×

                </button>

            </div>


            <div class="subscription-price">

                ₹${Number(subscription.price).toLocaleString("en-IN")}

                <span>
                    /month
                </span>

            </div>


            <div class="subscription-date">

                🔄 Renews on

                <strong>
                    ${formatDate(subscription.date)}
                </strong>

            </div>

        `;


        list.appendChild(card);

    });


    updateSubscriptionSummary();

}


function updateSubscriptionSummary() {

    const totalElement =
        document.getElementById(
            "subscriptionTotal"
        );

    const amountElement =
        document.getElementById(
            "subscriptionAmount"
        );


    const total =
        subscriptions.length;


    const monthlyAmount =
        subscriptions.reduce(
            function(sum, subscription) {

                return sum +
                    Number(subscription.price || 0);

            },
            0
        );


    if (totalElement) {

        totalElement.textContent = total;

    }


    if (amountElement) {

        amountElement.textContent =
            "₹" +
            monthlyAmount.toLocaleString("en-IN");

    }

}


/* Add subscription */

const subscriptionForm =
    document.getElementById(
        "subscriptionForm"
    );


if (subscriptionForm) {

    subscriptionForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "subscriptionName"
                ).value.trim();


            const price =
                document.getElementById(
                    "subscriptionPrice"
                ).value;


            const date =
                document.getElementById(
                    "subscriptionDate"
                ).value;


            const category =
                document.getElementById(
                    "subscriptionCategory"
                ).value;


            if (!name || !price || !date) {

                return;

            }


            const subscription = {

                id:
                    Date.now().toString(),

                name: name,

                price: Number(price),

                date: date,

                category: category

            };


            subscriptions.push(
                subscription
            );


            saveSubscriptions();

            displaySubscriptions();


            subscriptionForm.reset();


            closeModal(
                "subscriptionModal"
            );


            showPopupNotification(

                "Subscription Added",

                `${name} has been added successfully.`,

                "🔄"

            );

        }
    );

}


/* Delete subscription */

function deleteSubscription(id) {

    const subscription =
        subscriptions.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!subscription) return;


    const confirmDelete =
        confirm(
            `Delete ${subscription.name}?`
        );


    if (!confirmDelete) return;


    subscriptions =
        subscriptions.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveSubscriptions();

    displaySubscriptions();

}


/* =========================================================
   5. BILLS
   ========================================================= */

function displayBills() {

    const list =
        document.getElementById(
            "billList"
        ) ||
        document.getElementById(
            "billsList"
        );


    if (!list) return;


    list.innerHTML = "";


    if (bills.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>No bills added yet.</h3>

                <p>
                    Add your bills to keep track of payments.
                </p>

            </div>

        `;

        updateBillSummary();

        return;

    }


    bills.forEach(function(bill) {

        const card =
            document.createElement("div");

        card.className = "bill-card card";


        card.innerHTML = `

            <div class="card-top">

                <div>

                    <h3>
                        ${escapeHTML(bill.name)}
                    </h3>

                    <p>
                        ${formatDate(bill.date)}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteBill('${bill.id}')">

                    ×

                </button>

            </div>


            <h2>
                ₹${Number(bill.price).toLocaleString("en-IN")}
            </h2>

        `;


        list.appendChild(card);

    });


    updateBillSummary();

}


function updateBillSummary() {

    const totalElement =
        document.getElementById(
            "billTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            bills.length;

    }

}


function deleteBill(id) {

    const bill =
        bills.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!bill) return;


    if (
        !confirm(
            `Delete ${bill.name}?`
        )
    ) return;


    bills =
        bills.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveBills();

    displayBills();

}


/* =========================================================
   6. APPOINTMENTS
   ========================================================= */

function displayAppointments() {

    const list =
        document.getElementById(
            "appointmentList"
        ) ||
        document.getElementById(
            "appointmentsList"
        );


    if (!list) return;


    list.innerHTML = "";


    if (appointments.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>No appointments added yet.</h3>

                <p>
                    Add appointments to receive reminders.
                </p>

            </div>

        `;

        return;

    }


    appointments.forEach(function(appointment) {

        const card =
            document.createElement("div");

        card.className =
            "appointment-card card";


        card.innerHTML = `

            <div class="card-top">

                <div>

                    <h3>
                        ${escapeHTML(appointment.name)}
                    </h3>

                    <p>
                        📅 ${formatDate(appointment.date)}
                    </p>

                    <p>
                        ⏰ ${escapeHTML(appointment.time || "")}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteAppointment('${appointment.id}')">

                    ×

                </button>

            </div>

        `;


        list.appendChild(card);

    });

}


function deleteAppointment(id) {

    const appointment =
        appointments.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!appointment) return;


    if (
        !confirm(
            `Delete ${appointment.name}?`
        )
    ) return;


    appointments =
        appointments.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveAppointments();

    displayAppointments();

}


/* =========================================================
   7. DATE FUNCTIONS
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) return "";


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    if (isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function daysUntil(dateString) {

    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );


    const target =
        new Date(
            dateString + "T00:00:00"
        );

    target.setHours(
        0, 0, 0, 0
    );


    return Math.ceil(
        (
            target - today
        ) /
        (1000 * 60 * 60 * 24)
    );

}


/* =========================================================
   8. NOTIFICATION DATA
   ========================================================= */

function getNotifications() {

    const notifications = [];


    /* -------------------------
       BILLS
       ------------------------- */

    bills.forEach(function(bill) {

        const days =
            daysUntil(bill.date);


        if (days === 0) {

            notifications.push({

                id:
                    `bill-${bill.id}-today`,

                title:
                    "Bill Due Today",

                message:
                    `${bill.name} — ₹${bill.price} is due today.`,

                icon:
                    "💳"

            });

        }


        else if (days === 1) {

            notifications.push({

                id:
                    `bill-${bill.id}-tomorrow`,

                title:
                    "Bill Reminder",

                message:
                    `${bill.name} — ₹${bill.price} is due tomorrow.`,

                icon:
                    "💳"

            });

        }


        else if (
            days > 1 &&
            days <= 3
        ) {

            notifications.push({

                id:
                    `bill-${bill.id}-${days}`,

                title:
                    "Upcoming Bill",

                message:
                    `${bill.name} — ₹${bill.price} is due in ${days} days.`,

                icon:
                    "💳"

            });

        }

    });


    /* -------------------------
       SUBSCRIPTIONS
       ------------------------- */

    subscriptions.forEach(function(subscription) {

        const days =
            daysUntil(
                subscription.date
            );


        if (days === 0) {

            notifications.push({

                id:
                    `subscription-${subscription.id}-today`,

                title:
                    "Subscription Renewal",

                message:
                    `${subscription.name} renews today for ₹${subscription.price}.`,

                icon:
                    "🔄"

            });

        }


        else if (days === 1) {

            notifications.push({

                id:
                    `subscription-${subscription.id}-tomorrow`,

                title:
                    "Subscription Reminder",

                message:
                    `${subscription.name} renews tomorrow for ₹${subscription.price}.`,

                icon:
                    "🔄"

            });

        }


        else if (
            days > 1 &&
            days <= 3
        ) {

            notifications.push({

                id:
                    `subscription-${subscription.id}-${days}`,

                title:
                    "Upcoming Subscription",

                message:
                    `${subscription.name} renews in ${days} days.`,

                icon:
                    "🔄"

            });

        }

    });


    /* -------------------------
       APPOINTMENTS
       ------------------------- */

    appointments.forEach(function(appointment) {

        const days =
            daysUntil(
                appointment.date
            );


        if (days === 0) {

            notifications.push({

                id:
                    `appointment-${appointment.id}-today`,

                title:
                    "Appointment Today",

                message:
                    `${appointment.name} is today at ${appointment.time || "your scheduled time"}.`,

                icon:
                    "📅"

            });

        }


        else if (days === 1) {

            notifications.push({

                id:
                    `appointment-${appointment.id}-tomorrow`,

                title:
                    "Appointment Tomorrow",

                message:
                    `${appointment.name} is tomorrow at ${appointment.time || "your scheduled time"}.`,

                icon:
                    "📅"

            });

        }


        else if (
            days > 1 &&
            days <= 3
        ) {

            notifications.push({

                id:
                    `appointment-${appointment.id}-${days}`,

                title:
                    "Upcoming Appointment",

                message:
                    `${appointment.name} is in ${days} days.`,

                icon:
                    "📅"

            });

        }

    });


    return notifications;

}


/* =========================================================
   9. NOTIFICATION PANEL
   ========================================================= */

function displayNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    const count =
        document.getElementById(
            "notificationCount"
        );


    if (!list) return;


    const notifications =
        getNotifications();


    if (count) {

        count.textContent =
            notifications.length;


        if (
            notifications.length === 0
        ) {

            count.style.display =
                "none";

        } else {

            count.style.display =
                "flex";

        }

    }


    if (
        notifications.length === 0
    ) {

        list.innerHTML = `

            <p class="empty">
                🎉 You're all caught up!
            </p>

        `;

        return;

    }


    list.innerHTML = "";


    notifications.forEach(function(notification) {

        const item =
            document.createElement("div");


        item.className =
            "notification unread";


        item.innerHTML = `

            <div class="notification-icon">

                ${notification.icon}

            </div>


            <div class="notification-content">

                <h4>
                    ${escapeHTML(notification.title)}
                </h4>

                <p>
                    ${escapeHTML(notification.message)}
                </p>

                <div class="notification-time">

                    LifeAdmin Reminder

                </div>

            </div>

        `;


        list.appendChild(item);

    });

}


/* =========================================================
   10. NOTIFICATION PANEL TOGGLE
   ========================================================= */

function toggleNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!panel) return;


    if (
        panel.style.display === "block"
    ) {

        panel.style.display =
            "none";

    } else {

        panel.style.display =
            "block";

        displayNotifications();

    }

}


/* =========================================================
   11. MARK NOTIFICATIONS READ
   ========================================================= */

function markAllRead() {

    const count =
        document.getElementById(
            "notificationCount"
        );


    if (count) {

        count.style.display =
            "none";

    }


    const notifications =
        document.querySelectorAll(
            ".notification"
        );


    notifications.forEach(function(notification) {

        notification.classList.remove(
            "unread"
        );

    });

}


/* =========================================================
   12. POPUP NOTIFICATION
   ========================================================= */

function showPopupNotification(
    title,
    message,
    icon = "🔔"
) {

    const container =
        document.getElementById(
            "popupContainer"
        );


    if (!container) return;


    const popup =
        document.createElement("div");


    popup.className =
        "popup-notification";


    popup.innerHTML = `

        <div class="popup-icon">

            ${icon}

        </div>


        <div class="popup-content">

            <h4>
                ${escapeHTML(title)}
            </h4>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>


        <button
            class="popup-close"
            onclick="closePopup(this)">

            ×

        </button>

    `;


    container.appendChild(
        popup
    );


    setTimeout(
        function() {

            closePopup(
                popup.querySelector(
                    ".popup-close"
                )
            );

        },
        6000
    );

}


function closePopup(button) {

    if (!button) return;


    const popup =
        button.parentElement;


    if (!popup) return;


    popup.classList.add(
        "popup-hide"
    );


    setTimeout(
        function() {

            popup.remove();

        },
        400
    );

}


/* =========================================================
   13. PREVENT REPEATED POPUPS
   ========================================================= */

function checkPopupNotifications() {

    const notifications =
        getNotifications();


    if (
        notifications.length === 0
    ) {

        return;

    }


    let shown =
        JSON.parse(
            localStorage.getItem(
                "lifeadmin_shown_notifications"
            )
        ) || [];


    notifications.forEach(function(notification) {

        if (
            shown.includes(
                notification.id
            )
        ) {

            return;

        }


        showPopupNotification(

            notification.title,

            notification.message,

            notification.icon

        );


        shown.push(
            notification.id
        );

    });


    localStorage.setItem(

        "lifeadmin_shown_notifications",

        JSON.stringify(shown)

    );

}


/* =========================================================
   14. DASHBOARD
   ========================================================= */

function updateDashboard() {

    const billTotal =
        document.getElementById(
            "totalBills"
        );


    const subscriptionTotal =
        document.getElementById(
            "totalSubscriptions"
        );


    const appointmentTotal =
        document.getElementById(
            "totalAppointments"
        );


    const monthlyCommitment =
        document.getElementById(
            "monthlyCommitment"
        );


    if (billTotal) {

        billTotal.textContent =
            bills.length;

    }


    if (subscriptionTotal) {

        subscriptionTotal.textContent =
            subscriptions.length;

    }


    if (appointmentTotal) {

        appointmentTotal.textContent =
            appointments.length;

    }


    if (monthlyCommitment) {

        const amount =
            subscriptions.reduce(
                function(sum, subscription) {

                    return sum +
                        Number(
                            subscription.price || 0
                        );

                },
                0
            );


        monthlyCommitment.textContent =
            "₹" +
            amount.toLocaleString("en-IN");

    }


    displayUpcomingBills();

    displayUpcomingAppointments();

}


/* =========================================================
   15. UPCOMING BILLS
   ========================================================= */

function displayUpcomingBills() {

    const container =
        document.getElementById(
            "upcomingBills"
        );


    if (!container) return;


    const upcoming =
        bills
            .filter(function(bill) {

                return daysUntil(
                    bill.date
                ) >= 0;

            })
            .sort(function(a, b) {

                return (
                    new Date(a.date) -
                    new Date(b.date)
                );

            })
            .slice(0, 5);


    if (
        upcoming.length === 0
    ) {

        container.innerHTML = `

            <p>
                No bills added yet.
            </p>

        `;

        return;

    }


    container.innerHTML = "";


    upcoming.forEach(function(bill) {

        container.innerHTML += `

            <div class="upcoming-item">

                <div>

                    <strong>
                        ${escapeHTML(bill.name)}
                    </strong>

                    <p>
                        ${formatDate(bill.date)}
                    </p>

                </div>

                <strong>
                    ₹${Number(bill.price).toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    });

}


/* =========================================================
   16. UPCOMING APPOINTMENTS
   ========================================================= */

function displayUpcomingAppointments() {

    const container =
        document.getElementById(
            "upcomingAppointments"
        );


    if (!container) return;


    const upcoming =
        appointments
            .filter(function(appointment) {

                return daysUntil(
                    appointment.date
                ) >= 0;

            })
            .sort(function(a, b) {

                return (
                    new Date(a.date) -
                    new Date(b.date)
                );

            })
            .slice(0, 5);


    if (
        upcoming.length === 0
    ) {

        container.innerHTML = `

            <p>
                No appointments added yet.
            </p>

        `;

        return;

    }


    container.innerHTML = "";


    upcoming.forEach(function(appointment) {

        container.innerHTML += `

            <div class="upcoming-item">

                <div>

                    <strong>
                        📅 ${escapeHTML(appointment.name)}
                    </strong>

                    <p>
                        ${formatDate(appointment.date)}
                    </p>

                </div>

                <span>
                    ⏰ ${escapeHTML(appointment.time || "")}
                </span>

            </div>

        `;

    });

}


/* =========================================================
   17. SECURITY / TEXT CLEANING
   ========================================================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   18. CLOSE NOTIFICATION WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const panel =
            document.getElementById(
                "notificationPanel"
            );


        const button =
            document.querySelector(
                ".notification-btn"
            );


        if (!panel || !button) return;


        if (
            !panel.contains(event.target) &&
            !button.contains(event.target)
        ) {

            panel.style.display =
                "none";

        }

    }
);


/* =========================================================
   19. INITIALIZE LIFEADMIN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayBills();

        displaySubscriptions();

        displayAppointments();

        updateDashboard();

        displayNotifications();

        checkPopupNotifications();

    }
);


/* =========================================================
   20. AUTOMATIC NOTIFICATION CHECK
   ========================================================= */

/*
   Check every 60 seconds.
*/

setInterval(
    function() {

        displayNotifications();

        checkPopupNotifications();

    },
    60000
);


/* =========================================================
   21. SERVICE WORKER / PWA
   ========================================================= */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )

                .then(
                    function() {

                        console.log(
                            "LifeAdmin PWA ready."
                        );

                    }
                )

                .catch(
                    function(error) {

                        console.log(
                            "Service worker error:",
                            error
                        );

                    }
                );

        }
    );

}
```

[/writing]
