keyboard.ENTER = true;
setTimeout(() => {
    keyboard.ENTER = true;

    document.getElementById('instruction1').classList.add('d-none');
    document.getElementById('instruction2').classList.remove('d-none');
    document.getElementById('btnStart').classList.add('d-none');
    document.getElementById('btnRefresh').classList.remove('d-none');
}, 1);

