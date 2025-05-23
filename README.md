## 🛠️ Поставување на околина

### ⚙️ Backend

1. 📁 **Клонирање на репозиториумот**  
   Користете `git clone` за да го преземете репозиториумот локално.

2. 💻 **Отворање на проектот во IntelliJ IDEA (или друг IDE)**  
   Отворете го `pom.xml` фајлот за автоматски да се вчита проектот како Maven проект.

3. 🐳 **Конфигурација на база со Docker**  
   Потребно е да имате инсталирано Docker локално.  
   Извршете ја `docker-compose.yml` конфигурацијата за да се креира контејнер за базата на податоци.

4. 🗃️ **Проверка на конекција со базата**  
Обидете се да се поврзете со базата преку некој DB Management Tool (пр. DBeaver, pgAdmin)
или преку IntelliJ → Database tool window. Сите потребни информации за конектирање со базата се во `application.properties`. Овој чекор е важен за да се осигурате дека конекцијата е успешна.

5. 🗃️ **📦 Инсталирање dependencies и компајлирање**  
Потребно е да ги извршите следниве две команди во maven build tool:
```
 mvn clean install
```

6. ▶️ **Стартување на апликацијата**  
Отворете ја класата InterwayAppApplication и киликнете run на main методот.

### ⚛️ React Frontend

1. **Развојна околина**  
   Потребно е да имате инсталирано:
   - Node.js (препорачана верзија 18 или понова)
   - npm или yarn  
Ова може да го проверите во терминал со:
   ```
    node -v
    npm -v
   ```

2. 💻 **Отворање на проектот во Visual Studio Code (или друг IDE, алтернативно WebStorm)**  
    Отворете го frontend фолдерот за вчитување на проектот како проект преку IDE-то.

3. 📦 **Инсталирање на dependencies**  
   Извршете ја следната команда за да ги инсталирате сите потребни библиотеки:
 ```
    npm install
    \\или
   yarn install
```
4. ▶️ **Стартување на апликацијата**  
За да ја стартувате апликацијата извршете ја командава:
```
npm run dev
// или
yarn dev
```
