const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const saveDataToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadDataFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

const updateFormData = event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveDataToLocalStorage();
};

const handleFormSubmit = event => {
  event.preventDefault();
  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
};

form.addEventListener('input', updateFormData);
form.addEventListener('submit', handleFormSubmit);

loadDataFromLocalStorage();
