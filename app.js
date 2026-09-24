"use strict";

/*
    HACKING SCANNER
    FriendScan

    Versi awal:
    - QR / Barcode Scanner
    - Camera
    - Image Scanner
    - Target ID
    - Profile
    - Location dengan permission
    - Map
    - Public Information
    - Privacy status

    Tidak menggunakan database.
*/


let cameraStream = null;
let scanning = false;

let currentTarget = {
    id: null,
    name: "Unknown Target",
    accounts: [],
    location: null
};


// ==================================================
// TARGET ID
// ==================================================

function createTargetId() {

    const random =
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

    return "TGT-" + random;

}


// ==================================================
// DISPLAY TARGET
// ==================================================

function displayTarget() {

    document.getElementById(
        "targetName"
    ).textContent =
        currentTarget.name;

    document.getElementById(
        "targetId"
    ).textContent =
        "Target ID: " +
        (currentTarget.id || "-");

    const avatar =
        document.getElementById("avatar");

    avatar.textContent =
        currentTarget.name ===
        "Unknown Target"
            ? "?"
            : currentTarget.name
                .charAt(0)
                .toUpperCase();

    displayAccounts();

    displayLocation();

}


// ==================================================
// ACCOUNTS
// ==================================================

function displayAccounts() {

    const element =
        document.getElementById("accounts");

    if (
        currentTarget.accounts.length === 0
    ) {

        element.innerHTML =
            `<div class="info">
                Belum ada akun yang diberikan.
            </div>`;

        return;
    }

    element.innerHTML =
        currentTarget.accounts
            .map(account => {

                return `
                    <div class="account">
                        <strong>
                            ${escapeHTML(
                                account.platform
                            )}
                        </strong>

                        <br>

                        ${escapeHTML(
                            account.username
                        )}
                    </div>
                `;

            })
            .join("");

}


// ==================================================
// LOCATION
// ==================================================

function displayLocation() {

    const element =
        document.getElementById("location");

    const map =
        document.getElementById("map");

    if (!currentTarget.location) {

        element.textContent =
            "Lokasi belum dibagikan.";

        map.textContent =
            "Lokasi belum tersedia.";

        return;
    }

    const location =
        currentTarget.location;

    element.innerHTML = `
        <strong>Location Shared</strong>

        <br><br>

        Latitude:
        ${location.latitude.toFixed(6)}

        <br>

        Longitude:
        ${location.longitude.toFixed(6)}

        <br>

        Accuracy:
        ${Math.round(location.accuracy)} m

        <br>

        Updated:
        ${new Date(
            location.timestamp
        ).toLocaleString("id-ID")}
    `;

    map.innerHTML = `
        <div>

            📍 Location Available

            <br><br>

            ${location.latitude.toFixed(6)},
            ${location.longitude.toFixed(6)}

            <br><br>

            <a
                target="_blank"
                rel="noopener"
                href="https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}"
            >
                Open Map
            </a>

        </div>
    `;

}


// ==================================================
// CAMERA
// ==================================================

async function startCamera() {

    try {

        cameraStream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {
                        facingMode: {
                            ideal: "environment"
                        }
                    },

                    audio: false

                });

        const camera =
            document.getElementById("camera");

        camera.srcObject =
            cameraStream;

        scanning = true;

        document.getElementById(
            "scanStatus"
        ).textContent =
            "Camera aktif.";

        scanFrame();

    } catch (error) {

        document.getElementById(
            "scanStatus"
        ).textContent =
            "Camera gagal: " +
            error.message;

    }

}


document.getElementById(
    "startCamera"
).addEventListener(
    "click",
    startCamera
);


// ==================================================
// STOP CAMERA
// ==================================================

function stopCamera() {

    scanning = false;

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => {

                track.stop();

            });

        cameraStream = null;

    }

    document.getElementById(
        "camera"
    ).srcObject = null;

    document.getElementById(
        "scanStatus"
    ).textContent =
        "Camera berhenti.";

}


document.getElementById(
    "stopCamera"
).addEventListener(
    "click",
    stopCamera
);


// ==================================================
// BARCODE DETECTOR
// ==================================================

async function scanFrame() {

    if (!scanning) {
        return;
    }

    if (
        !("BarcodeDetector" in window)
    ) {

        document.getElementById(
            "scanStatus"
        ).textContent =
            "Browser tidak mendukung BarcodeDetector.";

        return;

    }

    try {

        const detector =
            new BarcodeDetector({

                formats: [
                    "qr_code",
                    "code_128",
                    "code_39",
                    "ean_13",
                    "ean_8",
                    "upc_a",
                    "upc_e"
                ]

            });

        const results =
            await detector.detect(
                document.getElementById(
                    "camera"
                )
            );

        if (results.length > 0) {

            processCode(
                results[0].rawValue
            );

            stopCamera();

            return;
        }

    } catch (error) {

        console.warn(error);

    }

    requestAnimationFrame(
        scanFrame
    );

}


// ==================================================
// PROCESS QR / BARCODE
// ==================================================

function processCode(value) {

    value = value.trim();

    let targetId = null;

    try {

        const data =
            JSON.parse(value);

        if (
            data.type ===
            "HACKING-SCANNER"
        ) {

            targetId =
                data.targetId;

        }

    } catch {

        if (
            /^TGT-[A-Z0-9]+$/i
                .test(value)
        ) {

            targetId =
                value.toUpperCase();

        }

    }

    if (!targetId) {

        document.getElementById(
            "scanStatus"
        ).textContent =
            "QR/barcode tidak dikenali.";

        return;
    }

    currentTarget.id =
        targetId;

    document.getElementById(
        "scanStatus"
    ).textContent =
        "Target ditemukan: " +
        targetId;

    displayTarget();

}


// ==================================================
// LOCATION
// ==================================================

document.getElementById(
    "shareLocation"
).addEventListener(
    "click",
    shareLocation
);


function shareLocation() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation tidak didukung browser."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        position => {

            currentTarget.location = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude,

                accuracy:
                    position.coords.accuracy,

                timestamp:
                    Date.now()

            };

            displayLocation();

            document.getElementById(
                "permissions"
            ).innerHTML = `

                <p>
                    Account:
                    <strong>
                        Not Connected
                    </strong>
                </p>

                <p>
                    Location:
                    <strong>
                        Granted
                    </strong>
                </p>

                <p>
                    Private Data:
                    <strong>
                        Protected
                    </strong>
                </p>

            `;

        },

        error => {

            alert(
                "Lokasi tidak tersedia: " +
                error.message
            );

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


// ==================================================
// IMAGE SCANNER
// ==================================================

document.getElementById(
    "imageInput"
).addEventListener(
    "change",
    async event => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        if (
            !("BarcodeDetector" in window)
        ) {

            alert(
                "Browser tidak mendukung image barcode scanning."
            );

            return;
        }

        const image =
            new Image();

        image.onload =
            async () => {

                try {

                    const detector =
                        new BarcodeDetector({

                            formats: [
                                "qr_code",
                                "code_128",
                                "code_39",
                                "ean_13",
                                "ean_8",
                                "upc_a",
                                "upc_e"
                            ]

                        });

                    const results =
                        await detector.detect(
                            image
                        );

                    if (
                        results.length === 0
                    ) {

                        document.getElementById(
                            "scanStatus"
                        ).textContent =
                            "QR/barcode tidak ditemukan.";

                        return;
                    }

                    processCode(
                        results[0].rawValue
                    );

                } catch (error) {

                    console.error(error);

                }

            };

        image.src =
            URL.createObjectURL(file);

    }
);


// ==================================================
// SECURITY
// ==================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ==================================================
// INITIALIZE
// ==================================================

currentTarget.id =
    createTargetId();

displayTarget();
