 function genPass(len, begge, store, små, nums, special) {
            const lower = "abcdefghijklmnopqrstuvwxyz";
            const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const numChars = "0123456789";
            const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
            let chars = '';


            
            if (begge) chars += upperChars + lower;
            if (store) chars += upperChars;
            if (små) chars += lower;    
            if (nums) chars += numChars;
            if (special) chars += specialChars;

            let pass = "";
            for (let i = 0; i < len; i++) {
                const randIdx = Math.floor(Math.random() * chars.length);
                pass += chars[randIdx];
                
            }

            return pass;
        }
        function generate() {
            const len = parseInt(document.getElementById("len").value);
            const begge = document.getElementById("begge").checked;
            const store = document.getElementById("store").checked;
            const små = document.getElementById("små").checked;
            const nums = document.getElementById("nums").checked;
            const special = document.getElementById("special").checked;

            const pass = genPass(len, begge, store, små, nums, special);
            document.getElementById("passOut").textContent = pass;
        }