<script setup>
import {ref} from "vue";
import {login, register} from '../api/auth.js';  // Импортируем API-запросы

const isLogin = ref(true);
const email = ref('');
const userLogin = ref('');
const fullName = ref('');
const password = ref('');
const confirmPassword = ref('');

const emailError = ref('');
const fullNameError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const serverError = ref('');

// Сброс всех ошибок
const resetErrors = () => {
  emailError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  serverError.value = '';
};

// Функция переключения формы и сброса ошибок
const toggleForm = () => {
  isLogin.value = !isLogin.value;
  resetErrors();  // Сброс всех ошибок при переключении формы
};

// Валидация email
const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const validateFullName = (value) => {
  const regex = /^[\p{L}\s-]+$/u;
  return regex.test(value);
}

// Функция для валидации формы
const validateForm = () => {
  let isValid = true;

  if (!validateEmail(email.value)) {
    emailError.value = 'Введите корректный email';
    isValid = false;
  } else {
    emailError.value = '';
  }

  if (password.value.length < 6) {
    passwordError.value = 'Пароль должен содержать минимум 6 символов';
    isValid = false;
  } else {
    passwordError.value = '';
  }

  if (!isLogin.value && password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Пароли не совпадают';
    isValid = false;
  } else {
    confirmPasswordError.value = '';
  }

  if (!validateFullName(fullName.value)) {
    fullNameError.value = 'Имя пользователя может содержать буквы, дефисы и пробелы';
    isValid = false;
  } else {
    fullNameError.value = '';
  }

  return isValid;
};

// Отправка данных формы на сервер
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    if (isLogin.value) {
      const response = await login(email.value, password.value);
      if (response.data.success) {
        console.log('Успешный вход');
      } else {
        serverError.value = response.data.message || 'Произошла ошибка. Попробуйте снова.';
      }
    } else {
      const response = await register(email.value, fullName.value, userLogin.value, password.value, confirmPassword.value);
      if (response.data.success) {
        console.log('Успешная регистрация');
      } else {
        serverError.value = response.data.message || 'Произошла ошибка. Попробуйте снова.';
      }
    }
  } catch (error) {
    serverError.value = error.response?.data?.message || 'Ошибка сети. Попробуйте снова.';
  }
};
</script>

<template>
  <div class="rounded-3xl overflow-hidden shadow-2xl">
    <Card class="flex items-center border-solid border-20 border-main-color">
      <template #title>
        <h2 class="text-2xl font-bold text-center">
          {{ isLogin ? 'Авторизация' : 'Регистрация' }}
        </h2>
      </template>
      <template #content>
        <div v-if="isLogin" class="p-6 pt-5 flex flex-col gap-6 rounded-full">
          <div>
            <FloatLabel variant="on">
              <InputText v-model="email" inputId="login_email_input" type="text" class="w-full"/>
              <label for="login_email_input">Логин</label>
            </FloatLabel>
            <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
          </div>
          <div>
            <FloatLabel variant="on">
              <Password
                  v-model="password"
                  inputId="login_password_input"
                  :feedback="false"
                  toggle-mask
                  :input-style="{width: '100%'}"
                  class="w-full"
              />
              <label for="login_password_input">Пароль</label>
            </FloatLabel>
            <span v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</span>
          </div>
          <Button class="w-full" @click="submitForm" rounded>{{ isLogin ? 'Войти' : 'Регистрация' }}</Button>
          <p class="text-sm text-center text-gray-600">
            У вас еще нет аккаунта?
            <span class="text-blue-600 cursor-pointer" @click="toggleForm">{{
                isLogin ? ' Зарегистрироваться' : ' Войти'
              }}</span>
          </p>
        </div>

        <div v-if="!isLogin" class="p-10 pt-5 flex flex-col gap-6">
          <div>
            <FloatLabel variant="on">
              <InputText v-model="email" inputId="register_email_input" type="text" class="w-full"/>
              <label for="register_email_input">Почта</label>
            </FloatLabel>
            <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText v-model="fullName" inputId="register_full_name_input" type="text" class="w-full"/>
              <label for="register_email_input">ФИО</label>
            </FloatLabel>
            <span v-if="fullNameError" class="text-red-500 text-sm">{{ fullNameError }}</span>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText v-model="userLogin" inputId="register_login_input" type="text" class="w-full"/>
              <label for="register_email_input">Логин</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on">
              <Password
                  v-model="password"
                  inputId="register_password_input"
                  :feedback="false"
                  toggle-mask
                  :input-style="{width: '100%'}"
                  class="w-full"
              />
              <label for="register_password_input">Пароль</label>
            </FloatLabel>
            <span v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</span>
          </div>
          <div>
            <FloatLabel variant="on">
              <Password
                  v-model="confirmPassword"
                  inputId="register_password_check"
                  :feedback="false"
                  toggle-mask
                  :input-style="{width: '100%'}"
                  class="w-full"
              />
              <label for="register_password_check">Подтвердите пароль</label>
            </FloatLabel>
            <span v-if="confirmPasswordError" class="text-red-500 text-sm">{{ confirmPasswordError }}</span>
          </div>
          <Button class="w-full" @click="submitForm">{{ isLogin ? 'Вход' : 'Регистрация' }}</Button>
          <p class="text-sm text-center text-gray-600">
            У вас уже есть аккаунт?
            <span class="text-blue-600 cursor-pointer" @click="toggleForm">{{
                isLogin ? ' Зарегистрироваться' : ' Войти'
              }}</span>
          </p>
        </div>

        <div v-if="serverError" class="text-red-500 text-center">{{ serverError }}</div>
      </template>
    </Card>
  </div>

</template>

<style scoped>
.p-invalid {
  border-color: red;
}
</style>
