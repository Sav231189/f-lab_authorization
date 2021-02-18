# Authorization

Блок авторизации

![Image alt](https://github.com/Sav231189/f-lab_authorization/raw/master/src/assets/images/image.png)
![Image alt](https://github.com/Sav231189/f-lab_authorization/raw/master/src/assets/images/image2.png)
![Image alt](https://github.com/Sav231189/f-lab_authorization/raw/master/src/assets/images/image3.png)

##

##### Installation: 
`npm install f-lab_authorization`

##
##### imports: 
`import Pagination from "f-lab_authorization";`

`import 'f-lab_authorization/dist/index.css'`

##
### Принимает параметры с настройками обработки:


`callback` - значение function, вызывается при клике 'вход/регистрация/востановить', в параметр передается объект с параметрами и функцией feedback (описание ниже).

`closeWindow` - значение function, только вызов функции при нажатии кнопки 'close', если вы отобразили ее в props isCloseWindowBtn={true}.

#### Описание объекта переданного в параметр функции callback:
    {
    type: "loginIn", 
    login: "alex@gmail.com",
    password: '123456',
    remember: true,
    feedback: ({
        type: 'error',
        message: 'Error!!!'
    })=>{...},
    remember: 
    }
    
type - тип вызова, одно из 3-х значений 'loginIn/registration/resetPassword'.
    
login - login, значение строка, введенное в поле при отправке.
    
email - email, значение строка, введенное в поле при отправке.
   
password - password, значение строка, введенное в поле при отправке.
   
remember - remember, значение boolean, true, если выбран checkBox, иначе false.
   
feedback - function, функция, которую необходимо вызвать, после ответа сервера. Пока не будет вызвана функция feedback окно логинизации будет не кликабельно (затемнено + loading.gif).
 
type:'success' - отобразит строку message зеленым цветом, если это не мешает логике, например при востановлении пароля. 

type:'error' - отобразит строку message красным цветом.
 
message: 'послание от сервера' - строка сообщения, необходимо следить что бы это был краткий ответ, window расчитан на ответ максимум в 2 строки.

Принимает объект:

пример 1:

    {
        type: 'success',
        message: 'Успешный успех!'
    }
пример 2:

    {
        type: 'error',
        message: 'Все плохо ('
    }


##
### Принимает параметры с настройками отображения:

`type` - значение string, задает режим работы (по умолчанию 'email'):
1. 'email' = стандартный режим с использованием в качестве логина e-mail.
2. 'login' = редим логин/пароль, отсутствует востановление пароля.
3. 'email-login' = смешанный режим, позволяет входить по логин/e-mail (без проверки на валидность e-mail), требует e-mail при регистрации, поддерживает востановление пароля.

`startWindow` - значение string, задает стартовое окно (по умолчанию 'login'):
1. 'login' - окно входа.
2. 'registration' - окно регистрации.
3. 'reset' - окно востановления пароля.

`isRememberMe` - значение boolean, отображение checkBox 'запомнить' (по умолчанию false).

`isCloseWindowBtn` - значение boolean, отображение кнопки 'close' (по умолчанию false).

`isLogin` - значение boolean, отображение ссылки перехода на окно 'Вход' (по умолчанию true).

`isRegister` - значение boolean, отображение ссылки перехода на окно 'Регистрация' (по умолчанию true).

`isResetPassword` - значение boolean, отображение ссылки перехода на окно 'Востановление пароля' (по умолчанию true).   !не работает с type='login'!  
