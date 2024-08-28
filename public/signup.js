let input = document.getElementById('fileInput');
        let btn = document.getElementById('rmImg');
        input.addEventListener('change', function(e){
            document.getElementById('imgBtn').classList.add('hidden');
            let imgCon = document.getElementById('imgContainer');
            imgCon.classList.remove('hidden');
            let url = URL.createObjectURL(document.getElementById('fileInput').files[0]);
            let img = document.createElement('img');
            img.src = url;
            img.id = 'userImg';
            imgCon.appendChild(img);
        });
        btn.addEventListener('click', function(){
            document.getElementById('imgBtn').classList.remove('hidden');
            let imgCon = document.getElementById('imgContainer');
            let input = document.getElementById('fileInput');
            document.getElementById('userImg').remove();
            input.value = null;
            imgCon.classList.add('hidden');
        });
        document.getElementById('form').addEventListener('submit', function(){
            document.getElementById('userFrom').reset();
        })