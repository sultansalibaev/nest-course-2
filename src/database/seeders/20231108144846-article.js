'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('articles', [{
        id: 1,
        title: "4 важных нововведения в ES2022",
        views: 22,
        tags: JSON.stringify([
          "javascript",
          "es2022",
          "ecmascript 2022"
        ]),
        type: JSON.stringify([
          "JavaScript",
          "IT",
          "Polotics",
          "Science",
          "Economics"
        ]),
        image: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        blocks: JSON.stringify([
          {
              "type": "image",
              "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/ad6/0f9/97c/ad60f997cba90689a9d766cb430b9111.png",
              "subtitle": "js ES 2022"
          },
          {
              "type": "text",
              "html": "ECMAScript 2022 - это новый стандарт JavaScript, который будет выпущен в июне 2022 года. Давайте посмотрим на самые важные изменения, которые, наиболее вероятно, должны появиться в новом релизе, так как они достигли уже 4-ой, последней стадии принятия новвоведений в спецификации EcmaScript (<a href=\"https://tc39.es/process-document/\"><span>TC39</span></a>)."
          },
          {
              "type": "quote",
              "html": "TC39 - это группа JavaScript разработчиков, которые принимают и выпускают новвоведения. В их процессе добавления улучшений в язык есть 4 стадии, где первая - это просто предложенная идея, а четвертая - обновление, готовое к выпуску в новой версии ECMAScript"
          },
          {
              "type": "title",
              "size": "h5",
              "title": "1. Метод \"at()\" в массивах"
          },
          {
              "type": "text",
              "html": "Наконец-то! ES2022 дал нам возможность обращаться к массивам с конца. Это незначительное новшество увеличит удобочитаемость кода при работе с&nbsp;<strong>массивами</strong>&nbsp;и&nbsp;<strong>строками</strong>."
          },
          {
              "type": "text",
              "html": "<strong>At()</strong>&nbsp;метод с положительным числом работает так же, как и&nbsp;<strong>[ ]</strong>, но передача отрицательного числа в этот метод позволяет нам получать значения с конца."
          },
          {
              "type": "text",
              "html": "Вместо того, чтобы писать:"
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "const arr = [1,2,3,4]\narr[arr.length - 2] // 3\narr.slice(-2)[0]    // 3\n\nconst str = \"1234\"\nstr[str.length - 2] // '3'\nstr.slice(-2)[0]    // '3'"
          },
          {
              "type": "text",
              "html": "Мы сможем писать:"
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "const arr = [1,2,3,4]\narr.at(-2) // 3\n\nconst str = \"1234\"\nstr.at(-2) // '3'"
          },
          {
              "type": "title",
              "size": "h5",
              "title": "2. Error cause"
          },
          {
              "type": "text",
              "html": "Свойство <strong>.cause</strong> в объекте ошибки позволяет нам указать, какая ошибка спровоцировала другую ошибку. Довольно очевидно, не так ли? Пример использования данного свойства:"
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "try {\n  //Выполняем какое-то действие, которое выбросит ошибку\n  doSomeComputationThatThrowAnError() \n} catch (error) {\n  throw new Error('Я результат другой ошибки', { cause: error })\n}"
          },
          {
              "type": "text",
              "html": "<strong>Error cause</strong> будет идеальным решением для связки ошибок в цепочки, подобное есть в других языках программирования, например, в Java."
          },
          {
              "type": "title",
              "size": "h5",
              "title": "3. Ключевое слово \"await\" вне функции"
          },
          {
              "type": "text",
              "html": "Знали ли вы, что нельзя использовать <strong>await</strong> в коде вне функции? Если нет, то для вас это не так важно. Но остальные могут быть уверены, что ES2022 изменит это."
          },
          {
              "type": "title",
              "size": "h5",
              "title": "В чём польза?"
          },
          {
              "type": "list",
              "mode": "li",
              "list": [
                  "Это позволяет загружать модули динамически"
              ]
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "const serviceName = await fetch(\"https://example.com/what-service-should-i-use\")\nconst service = await import(`/services/${serviceName}.js`)\n\n// ИЛИ\n\nconst params = new URLSearchParams(location.search);\nconst theme = params.get('theme');\nconst stylingFunctions = await import(`/styling-functions-${theme}.js`);"
          },
          {
              "type": "list",
              "mode": "li",
              "list": [
                  "Это позволяет загружать модули условно"
              ]
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "const date = new Date()\n\nif(date.getFullYear() === 2023) {\n  await require('/special-code-for-2023-year.js')\n}"
          },
          {
              "type": "text",
              "html": "Я почти уверен, что есть и больше вариантов использования обновленного await (возможно, менее абстрактного, чем в приведенных примерах). Пишите свои примеры в комментариях!"
          },
          {
              "type": "title",
              "size": "h5",
              "title": "4. Приватные поля и методы"
          },
          {
              "type": "text",
              "html": "Классы в JavaScript были представлены еще в ES6, но их реализация едва ли соответствовала ООП. Много разработчиков использовали TypeScript для включения некоторых новых возможностей, а сейчас мы можем их использовать в чистом JavaScript."
          },
          {
              "type": "text",
              "html": "<strong>Приватные поля</strong> или же <strong>свойства</strong> - одна из этих возможностей. ES2022 даёт нам возможность создавать их и получать ошибку, когда мы пытаемся к ним обратиться, находясь вне класса. Аналогично и с приватными методами. Интересно, что команда JavaScript решила использовать <strong>#</strong> в виде префикса для обозначения подобных полей."
          },
          {
              "type": "text",
              "html": "Пример приватного поля:"
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "class Human {\n  #name = \"John\";\n  \n  setName(name) {\n    this.#name = name;\n  }\n}\n\nconst human = new Human()\nhuman.#name = 'Amy'  // ОШИБКА!\nhuman.setName('Amy') // ОК"
          },
          {
              "type": "text",
              "html": "И приватного метода:"
          },
          {
              "type": "code",
              "language": "JavaScript",
              "code": "class Human {\n  name = \"John\";\n  \n  constructor(name) {\n    this.#setName('Amy') // OK\n  }\n  \n  #setName(name) {\n    this.name = name;\n  }\n}\n\nconst human = new Human()\nhuman.#setName('Amy') // ОШИБКА!"
          },
          {
              "type": "title",
              "size": "h5",
              "title": "Итог"
          },
          {
              "type": "text",
              "html": "Список неполный, но я выбрал, по моему мнению, наиболее важные и полезные обновления в новом выпуске. Вы можете найти все улучшения <a href=\"https://exploringjs.com/impatient-js/ch_new-javascript-features.html#new-in-es2022\" rel=\"noopener noreferrer nofollow\">здесь</a>. Дайте знать, какие фичи вам больше всего понравились, и какими вы планируете пользоваться."
          },
          {
              "type": "text",
              "html": "<strong>P.S.</strong> Это был мой первый перевод. А вот <a href=\"https://medium.com/@bsalwiczek/4-most-important-features-coming-in-es2022-that-you-should-know-about-f7e18c1bff9b\" rel=\"noopener noreferrer nofollow\">оригинальная статья</a>."
          }
        ]),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }
    catch (e) {
      console.log(e)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};