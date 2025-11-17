
         <div class="container">
        <h1>Passord generator</h1>
        <label>
            Passord Lengde:
            <input id="len" min="6" max="20" type="number" value="8" />
        </label>
        <br />
        <label>
            <input id="begge" type="checkbox"  /> Begge deler
        </label>
        <br />
        <label>
            <input id="små" type="checkbox" checked /> Bare små bokstaver
        </label>
        <br />
        <label>
            <input id="store" type="checkbox"  /> Bare store bokstaver
        </label>
        <br />
        <label>
            <input id="nums" type="checkbox"  /> Inkluder number
        </label>
        <br />
        <label>
            <input id="special" type="checkbox"  /> Inkluder spesialtegn
        </label>
        <br />
        <button class="btn" onclick="generate()">Generer passord</button>
        <div class="output" id="passOut">Her vises passordet</div>
    </div>
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
            console.log("Hello world")
        }

     
    
