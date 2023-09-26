document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log('Form data:', formObject);
    });
});
