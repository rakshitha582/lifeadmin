// ================================
// LIFEADMIN STORAGE
// ================================

let bills =
    JSON.parse(localStorage.getItem("lifeadmin_bills")) || [];

let subscriptions =
    JSON.parse(localStorage.getItem("lifeadmin_subscriptions")) || [];

let appointments =
    JSON.parse(localStorage.getItem("lifeadmin_appointments")) || [];


// ================================
// SAVE DATA
// ================================

function saveData() {

    localStorage.setItem(
        "lifeadmin_bills",
        JSON.stringify(bills)
    );

    localStorage.setItem(
        "lifeadmin_subscriptions",
        JSON.stringify(subscriptions)
    );

    localStorage.setItem(
        "lifeadmin_appointments",
        JSON.stringify(appointments)
    );

}


// ================================
// MODAL
// ================================

function openModal(id) {

    document.getElementById(id).style.display = "flex";

}


function closeModal(id) {

    document.getElementById(id).style.display = "none";

}


window.onclick = function(event) {

    if (event.target.classList.contains("modal")) {

        event.target.style.display = "none";

    }

};


// ================================
// BILL FORM
// ================================

const billForm =
    document.getElementById("billForm");


if (billForm) {

    billForm.addEventListener("submit", function(e) {

        e.preventDefault();


        const bill = {

            id: Date.now(),

            name:
                document.getElementById("billName").value,

            price:
                Number(
                    document.getElementById("billPrice").value
                ),

            date:
                document.getElementById("billDate").value,

            category:
                document.getElementById("billCategory").value,

            frequency:
                document.getElementById("billFrequency").value

        };


        bills.push(bill);

        saveData();

        billForm.reset();

        closeModal("billModal");

        displayBills();

        updateDashboard();

    });

}


// ================================
// DISPLAY BILLS
// ================================

function displayBills() {

    const container =
        document.getElementById("billList");

    if (!container) return;


    container.innerHTML = "";


    if (bills.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No bills added yet.
            </p>`;

        return;

    }


    bills.forEach(function(bill) {

        container.innerHTML += `

            <div class="item-card">

                <div class="item-top">

                    <div class="item-icon">
                        💳
                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteBill(${bill.id})">

                        Delete

                    </button>

                </div>


                <h3>
                    ${bill.name}
                </h3>


                <p>
                    ${bill.category}
                </p>


                <div class="price">
                    ₹${bill.price}
                </div>


                <p>
                    Due: ${formatDate(bill.date)}
                </p>


                <span class="badge">
                    ${bill.frequency}
                </span>

            </div>

        `;

    });


    const total =
        bills.reduce(
            (sum, bill) => sum + bill.price,
            0
        );


    const billTotal =
        document.getElementById("billTotal");

    const billAmount =
        document.getElementById("billAmount");


    if (billTotal)
        billTotal.innerText = bills.length;


    if (billAmount)
        billAmount.innerText = "₹" + total;

}


// ================================
// DELETE BILL
// ================================

function deleteBill(id) {

    bills =
        bills.filter(
            bill => bill.id !== id
        );

    saveData();

    displayBills();

    updateDashboard();

}


// ================================
// SUBSCRIPTION FORM
// ================================

const subscriptionForm =
    document.getElementById("subscriptionForm");


if (subscriptionForm) {

    subscriptionForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const subscription = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "subscriptionName"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "subscriptionPrice"
                        ).value
                    ),

                date:
                    document.getElementById(
                        "subscriptionDate"
                    ).value,

                category:
                    document.getElementById(
                        "subscriptionCategory"
                    ).value

            };


            subscriptions.push(
                subscription
            );


            saveData();

            subscriptionForm.reset();

            closeModal(
                "subscriptionModal"
            );

            displaySubscriptions();

            updateDashboard();

        }
    );

}


// ================================
// DISPLAY SUBSCRIPTIONS
// ================================

function displaySubscriptions() {

    const container =
        document.getElementById(
            "subscriptionList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (subscriptions.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No subscriptions added yet.
            </p>`;

        return;

    }


    subscriptions.forEach(
        function(subscription) {

            container.innerHTML += `

                <div class="item-card">

                    <div class="item-top">

                        <div class="item-icon">
                            🔄
                        </div>

                        <button
                            class="delete-btn"
                            onclick="
                            deleteSubscription(
                            ${subscription.id}
                            )">

                            Delete

                        </button>

                    </div>


                    <h3>
                        ${subscription.name}
                    </h3>


                    <p>
                        ${subscription.category}
                    </p>


                    <div class="price">
                        ₹${subscription.price}
                        <small>/ month</small>
                    </div>


                    <p>
                        Renewal:
                        ${formatDate(
                            subscription.date
                        )}
                    </p>


                    <span class="badge">
                        Active
                    </span>

                </div>

            `;

        }
    );


    const total =
        subscriptions.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );


    const subscriptionTotal =
        document.getElementById(
            "subscriptionTotal"
        );

    const subscriptionAmount =
        document.getElementById(
            "subscriptionAmount"
        );


    if (subscriptionTotal)
        subscriptionTotal.innerText =
            subscriptions.length;


    if (subscriptionAmount)
        subscriptionAmount.innerText =
            "₹" + total;

}


// ================================
// DELETE SUBSCRIPTION
// ================================

function deleteSubscription(id) {

    subscriptions =
        subscriptions.filter(
            item => item.id !== id
        );

    saveData();

    displaySubscriptions();

    updateDashboard();

}


// ================================
// APPOINTMENT FORM
// ================================

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const appointment = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "appointmentName"
                    ).value,

                date:
                    document.getElementById(
                        "appointmentDate"
                    ).value,

                time:
                    document.getElementById(
                        "appointmentTime"
                    ).value,

                location:
                    document.getElementById(
                        "appointmentLocation"
                    ).value,

                notes:
                    document.getElementById(
                        "appointmentNotes"
                    ).value

            };


            appointments.push(
                appointment
            );


            saveData();

            appointmentForm.reset();

            closeModal(
                "appointmentModal"
            );

            displayAppointments();

            updateDashboard();

        }
    );

}


// ================================
// DISPLAY APPOINTMENTS
// ================================

function displayAppointments() {

    const container =
        document.getElementById(
            "appointmentList"
        );

    if (!container) return;


    container.innerHTML = "";


    if (appointments.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No appointments added yet.
            </p>`;

        return;

    }


    appointments
        .sort(
            (a, b) =>
                new Date(
                    a.date + " " + a.time
                ) -
                new Date(
                    b.date + " " + b.time
                )
        )
        .forEach(
            function(appointment) {

                container.innerHTML += `

                    <div class="item-card">

                        <div class="item-top">

                            <div class="item-icon">
                                📅
                            </div>

                            <button
                                class="delete-btn"
                                onclick="
                                deleteAppointment(
                                ${appointment.id}
                                )">

                                Delete

                            </button>

                        </div>


                        <h3>
                            ${appointment.name}
                        </h3>


                        <div class="price">
                            ${formatDate(
                                appointment.date
                            )}
                        </div>


                        <p>
                            ⏰ ${appointment.time}
                        </p>


                        <p>
                            📍 ${
                                appointment.location ||
                                "No location"
                            }
                        </p>


                        ${
                            appointment.notes
                            ?
                            `<p>
                                📝 ${appointment.notes}
                             </p>`
                            :
                            ""
                        }

                    </div>

                `;

            }
        );


    const appointmentTotal =
        document.getElementById(
            "appointmentTotal"
        );


    if (appointmentTotal)
        appointmentTotal.innerText =
            appointments.length;

}


// ================================
// DELETE APPOINTMENT
// ================================

function deleteAppointment(id) {

    appointments =
        appointments.filter(
            item => item.id !== id
        );

    saveData();

    displayAppointments();

    updateDashboard();

}


// ================================
// DASHBOARD
// ================================

function updateDashboard() {

    const billCount =
        document.getElementById(
            "billCount"
        );

    const subscriptionCount =
        document.getElementById(
            "subscriptionCount"
        );

    const appointmentCount =
        document.getElementById(
            "appointmentCount"
        );

    const monthlyTotal =
        document.getElementById(
            "monthlyTotal"
        );


    if (billCount)
        billCount.innerText =
            bills.length;


    if (subscriptionCount)
        subscriptionCount.innerText =
            subscriptions.length;


    if (appointmentCount)
        appointmentCount.innerText =
            appointments.length;


    if (monthlyTotal) {

        const billTotal =
            bills.reduce(
                (sum, bill) =>
                    sum + bill.price,
                0
            );


        const subscriptionTotal =
            subscriptions.reduce(
                (sum, item) =>
                    sum + item.price,
                0
            );


        monthlyTotal.innerText =
            "₹" +
            (billTotal + subscriptionTotal);

    }


    displayDashboardBills();

    displayDashboardAppointments();

}


// ================================
// DASHBOARD BILLS
// ================================

function displayDashboardBills() {

    const container =
        document.getElementById(
            "dashboardBills"
        );

    if (!container) return;


    if (bills.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No bills added yet.
            </p>`;

        return;

    }


    container.innerHTML = "";


    bills.slice(0, 4).forEach(
        function(bill) {

            container.innerHTML += `

                <div class="item-card">

                    <div class="item-top">

                        <div class="item-icon">
                            💳
                        </div>

                        <span class="badge">
                            ${bill.frequency}
                        </span>

                    </div>

                    <h3>
                        ${bill.name}
                    </h3>

                    <p>
                        Due:
                        ${formatDate(bill.date)}
                    </p>

                    <div class="price">
                        ₹${bill.price}
                    </div>

                </div>

            `;

        }
    );

}


// ================================
// DASHBOARD APPOINTMENTS
// ================================

function displayDashboardAppointments() {

    const container =
        document.getElementById(
            "dashboardAppointments"
        );

    if (!container) return;


    if (appointments.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No appointments added yet.
            </p>`;

        return;

    }


    container.innerHTML = "";


    appointments
        .slice(0, 4)
        .forEach(
            function(appointment) {

                container.innerHTML += `

                    <div class="item-card">

                        <div class="item-top">

                            <div class="item-icon">
                                📅
                            </div>

                        </div>

                        <h3>
                            ${appointment.name}
                        </h3>

                        <p>
                            ${formatDate(
                                appointment.date
                            )}
                        </p>

                        <p>
                            ⏰ ${appointment.time}
                        </p>

                    </div>

                `;

            }
        );

}


// ================================
// DATE FORMATTER
// ================================

function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ================================
// INITIAL LOAD
// ================================

displayBills();

displaySubscriptions();

displayAppointments();

updateDashboard();


// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function getNotifications() {

    let notifications = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    // BILL NOTIFICATIONS

    bills.forEach(function(bill) {

        const dueDate = new Date(bill.date);

        dueDate.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil(
                (dueDate - today) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 0) {

            notifications.push({

                title: bill.name,

                message:
                    `₹${bill.price} is due today.`,

                icon: "💳"

            });

        }

        else if (difference === 1) {

            notifications.push({

                title: bill.name,

                message:
                    `₹${bill.price} is due tomorrow.`,

                icon: "💳"

            });

        }

        else if (difference > 1 && difference <= 3) {

            notifications.push({

                title: bill.name,

                message:
                    `₹${bill.price} is due in ${difference} days.`,

                icon: "💳"

            });

        }

    });


    // SUBSCRIPTION NOTIFICATIONS

    subscriptions.forEach(function(subscription) {

        const renewalDate =
            new Date(subscription.date);

        renewalDate.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil(
                (renewalDate - today) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 0) {

            notifications.push({

                title: subscription.name,

                message:
                    `Your ₹${subscription.price} subscription renews today.`,

                icon: "🔄"

            });

        }

        else if (difference === 1) {

            notifications.push({

                title: subscription.name,

                message:
                    `Your subscription renews tomorrow.`,

                icon: "🔄"

            });

        }

        else if (difference > 1 && difference <= 3) {

            notifications.push({

                title: subscription.name,

                message:
                    `Your subscription renews in ${difference} days.`,

                icon: "🔄"

            });

        }

    });


    // APPOINTMENT NOTIFICATIONS

    appointments.forEach(function(appointment) {

        const appointmentDate =
            new Date(appointment.date);

        appointmentDate.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil(
                (appointmentDate - today) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 0) {

            notifications.push({

                title: appointment.name,

                message:
                    `You have an appointment today at ${appointment.time}.`,

                icon: "📅"

            });

        }

        else if (difference === 1) {

            notifications.push({

                title: appointment.name,

                message:
                    `Tomorrow at ${appointment.time}.`,

                icon: "📅"

            });

        }

        else if (difference > 1 && difference <= 3) {

            notifications.push({

                title: appointment.name,

                message:
                    `Your appointment is in ${difference} days.`,

                icon: "📅"

            });

        }

    });


    return notifications;
}


function displayNotifications() {

    const list =
        document.getElementById("notificationList");

    const count =
        document.getElementById("notificationCount");

    if (!list) return;


    const notifications =
        getNotifications();


    if (count) {

        count.innerText =
            notifications.length;

        if (notifications.length === 0) {

            count.style.display = "none";

        } else {

            count.style.display = "flex";

        }

    }


    if (notifications.length === 0) {

        list.innerHTML = `
            <p class="empty">
                🎉 You're all caught up!
            </p>
        `;

        return;

    }


    list.innerHTML = "";


    notifications.forEach(function(notification) {

        list.innerHTML += `

            <div class="notification unread">

                <div class="notification-icon">
                    ${notification.icon}
                </div>

                <div class="notification-content">

                    <h4>
                        ${notification.title}
                    </h4>

                    <p>
                        ${notification.message}
                    </p>

                    <div class="notification-time">
                        LifeAdmin Reminder
                    </div>

                </div>

            </div>

        `;

    });

}


function toggleNotifications() {

    const panel =
        document.getElementById("notificationPanel");

    if (!panel) return;


    if (panel.style.display === "block") {

        panel.style.display = "none";

    } else {

        panel.style.display = "block";

        displayNotifications();

    }

}


function markAllRead() {

    const count =
        document.getElementById("notificationCount");

    if (count) {

        count.style.display = "none";

    }

}


displayNotifications();

setInterval(
    displayNotifications,
    60000
);