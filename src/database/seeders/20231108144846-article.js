'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('articles', [
                {
                    id: 1,
                    title: "4 важных нововведения в ES2022",
                    views: 22,
                    userId: 1,
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
                    createdAt: new Date('2022-02-26T00:00:00'),
                    updatedAt: new Date('2022-02-26T00:00:00'),
                },
                {
                    id: 2,
                    title: "В альфа выпуск языка программирования Python 3.13.0a6 встроен JIT-компилятор",
                    views: 6600,
                    userId: 1, // 2
                    image: "https://i.pinimg.com/originals/1c/86/84/1c8684b06bc7ad1e1f6b7b0099d87300.jpg",
                    blocks: JSON.stringify([
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/webt/9q/6e/_d/9q6e_dwshyr80fokynq2tb1iuwe.png",
                            "subtitle": "js ES 2022"
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://pythoninsider.blogspot.com/2024/04/python-3123-and-3130a6-released.html\" rel=\"noopener noreferrer nofollow\">Опубликован</a> альфа выпуск языка программирования <a href=\"https://www.python.org/\" rel=\"noopener noreferrer nofollow\">Python</a> 3.13.0a6, в который включена экспериментальная реализация <a href=\"https://docs.python.org/dev/whatsnew/3.13.html#experimental-jit-compiler\" rel=\"noopener noreferrer nofollow\">JIT-компилятора</a>, позволяющая добиться существенного повышения производительности. Для активации JIT в CPython добавлена сборочная опция \"--enable-experimental-jit\". Для работы JIT требуется установка LLVM в качестве дополнительной зависимости."
                        },
                        {
                            "type": "text",
                            "html": "По <a href=\"http://www.opennet.ru/opennews/art.shtml?num=60966\" rel=\"noopener noreferrer nofollow\">информации</a> OpenNET, процесс трансляции машинного кода в JIT <a href=\"https://www.opennet.ru/opennews/art.shtml?num=60352\" rel=\"noopener noreferrer nofollow\">построен</a> с использованием архитектуры <a href=\"https://fredrikbk.com/publications/copy-and-patch.pdf\" rel=\"noopener noreferrer nofollow\">Copy-and-Patch</a>, при которой при помощи LLVM собирается объектный файл в формате ELF, содержащий данные об инструкциях байткода и информацию о необходимой замене данных."
                        },
                        {
                            "type": "text",
                            "html": "JIT заменяет сгенерированные в ходе интерпретации программы инструкции байткода на их представления в машинном коде, попутно подставляя необходимые для вычислений данные (JIT копирует готовые шаблоны уже скомпилированных функций и подставляет в них необходимые значения, такие как аргументы и константы)."
                        },
                        {
                            "type": "text",
                            "html": "Предложенный JIT примечателен очень высокой скоростью генерации кода, простотой сопровождения и полной интеграцией с интерпретатором."
                        },
                        {
                            "type": "text",
                            "html": "По сравнению с компиляцией в WebAssembly (<a href=\"https://v8.dev/blog/liftoff\" rel=\"noopener noreferrer nofollow\">Liftoff</a>), новый JIT генерирует код в 5 раз быстрее, а результирующий код работает на 50% быстрее. При сравнении с традиционным JIT-инструментарием LLVM добавленный в CPython JIT обеспечивает в 100 раз более быструю генерацию кода и на 15% более быстрый результирующий код."
                        }
                    ]),
                    createdAt: new Date('2024-05-01T00:00:00'),
                    updatedAt: new Date('2024-05-01T00:00:00'),
                },
                {
                    id: 3,
                    title: "Использование Ionic и Vue 3 для создания мобильных приложений",
                    views: 5600,
                    userId: 1, // 2
                    image: "https://a.storyblok.com/f/42126/28120367e7/ionic-vue-complete-tutorial-thumb.png/m/filters:quality(70)/",
                    blocks: JSON.stringify([
                        {
                            "type": "text",
                            "html": "В современном мире мобильные приложения играют важную роль в нашей повседневной жизни. Разработка мобильных приложений стала все более популярной, и существует множество фреймворков и инструментов для создания кросс-платформенных приложений. В этой статье мы рассмотрим процесс разработки мобильных приложений с использованием Ionic, Vue 3 и Capacitor, сочетающих в себе преимущества гибкости Vue.js и возможности кросс-платформенной разработки Ionic и Capacitor. Вперед под кат)"
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Что такое Ionic?"
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://ionicframework.com/\" rel=\"noopener noreferrer nofollow\"><strong>Ionic</strong></a> - это фреймворк для разработки гибридных мобильных приложений с использованием веб-технологий. Он позволяет создавать приложения, которые могут работать на разных платформах, включая iOS и Android. Ionic предоставляет набор компонентов, а также инструменты для разработки, сборки и развертывания приложений."
                        },
                        {
                            "type": "text",
                            "html": "Ionic обладает несколькими особенностями и преимуществами, которые делают его популярным среди разработчиков мобильных приложений:"
                        },
                        {
                            "type": "list",
                            "mode": "li",
                            "list": [
                                "<strong>Кросс-платформенность</strong>: Приложения, разработанные с использованием Ionic, могут быть запущены на разных платформах, что существенно упрощает процесс разработки и позволяет достичь широкой аудитории пользователей.",
                                "<strong>Использование веб-технологий</strong>: Ionic использует знакомые веб-технологии, такие как HTML, CSS и JavaScript. Это позволяет нам легко начать создавать мобильные приложения без необходимости изучения новых языков или платформ.",
                                "<strong>Компоненты пользовательского интерфейса</strong>: Ionic предоставляет богатый набор предварительно стилизованных компонентов пользовательского интерфейса, таких как кнопки, формы, списки и многое другое. Это упрощает создание интерфейса для приложения.",
                                "<strong>Поддержка плагинов</strong>: Ionic интегрируется с Capacitor, что позволяет использовать плагины для получения доступа к функциям устройства, таким как камера, геолокация и уведомления. Это расширяет возможности приложения и позволяет нам взаимодействовать с API системы устройства."
                            ]
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Что такое Capacitor?"
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://capacitorjs.com/\" rel=\"noopener noreferrer nofollow\"><strong>Capacitor</strong></a> - это фреймворк, который позволяет создавать нативные приложения с использованием HTML/CSS/JS. Он является частью экосистемы Ionic и используется для доступа к нативным API устройства, таким как камера, геолокация, файловая система и другие."
                        },
                        {
                            "type": "text",
                            "html": "Сам Capacitor работает следующим образом:"
                        },
                        {
                            "type": "list",
                            "mode": "ol",
                            "list": [
                                "Разработчик создает приложение с использованием Ionic и Vue.js.",
                                "Capacitor предоставляет набор плагинов, которые позволяют взаимодействовать с нативными возможностями устройства.",
                                "Приложение собирается в нативный проект для каждой платформы (например, Android или iOS).",
                                "Capacitor создает мост между приложением и нативным кодом устройства, позволяя нам использовать нативные API.",
                                "Приложение запускается на устройстве и может использовать функциональность, предоставляемую нативными API."
                            ]
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Начало работы над проектом"
                        },
                        {
                            "type": "text",
                            "html": "Для начала нам потребуется <a href=\"https://www.npmjs.com/package/@ionic/cli\" rel=\"noopener noreferrer nofollow\">@ionic/cli</a>, мы можем установить его глобально:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npm i -g @ionic/cli"
                        },
                        {
                            "type": "text",
                            "html": "Теперь мы можем создать проект на базе ionic с поддержкой capacitor:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "ionic start my-app tabs --type vue --capacitor"
                        },
                        {
                            "type": "quote",
                            "html": "Ранее мы могли создавать приложения с помощью Cordova, однако команда Ionic забросили деприкейтнули данную технологию. Теперь все приложения, которые используют Ionic используют Capacitor"
                        },
                        {
                            "type": "text",
                            "html": "В процессе создания бойлерплейта ionic может попросить создать аккаунт, смело отказываем:"
                        },
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/2c2/a26/374/2c2a26374d616a1a5d62eac3a4d9a58a.png",
                            "subtitle": "terminal"
                        },
                        {
                            "type": "text",
                            "html": "Если мы перейдем в директорию <code>my-app</code> и посмотрим на файлы, которые там создались, то увидим примерно следующее:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "exa -lbGF --git --tree --level=1\ndrwxr-xr-x@     - tokiory 18 Jun 22:12 -- ./\n.rw-r--r--@   223 tokiory 18 Jun 22:11 -- ├── capacitor.config.ts\n.rw-r--r--@   417 tokiory  5 Jun 22:51 -- ├── cypress.config.ts\n.rw-r--r--@   903 tokiory  5 Jun 22:51 -- ├── index.html\n.rw-r--r--@    90 tokiory 18 Jun 22:11 -- ├── ionic.config.json\ndrwxr-xr-x@     - tokiory 18 Jun 22:11 -I ├── node_modules/\n.rw-r--r--@ 587Ki tokiory 18 Jun 22:11 -- ├── package-lock.json\n.rw-r--r--@ 1.0Ki tokiory 18 Jun 22:11 -- ├── package.json\ndrwxr-xr-x@     - tokiory 18 Jun 22:10 -- ├── public/\ndrwxr-xr-x@     - tokiory 18 Jun 22:10 -- ├── src/\ndrwxr-xr-x@     - tokiory 18 Jun 22:10 -- ├── tests/\n.rw-r--r--@   535 tokiory  5 Jun 22:51 -- ├── tsconfig.json\n.rw-r--r--@   184 tokiory  5 Jun 22:51 -- ├── tsconfig.node.json\n.rw-r--r--@   387 tokiory  5 Jun 22:51 -- └── vite.config.ts"
                        },
                        {
                            "type": "text",
                            "html": "Ionic предоставил нам темплейт на базе Vite, Vue 3, Typescript, а в качестве фреймворка для End-to-End тестирования добавил Cypress. Естественно, мы можем почистить темплейт от лишних технологий (я бы заменил Cypress на Playwright прямо на старте), однако, сейчас достаточно того факта, что мы можем отключать ненужные технологии из нашего темплейта, сама сборка приложения от этого не сломается."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Немного о стилизации и веб-компонентах"
                        },
                        {
                            "type": "text",
                            "html": "Если мы запустим наше приложение, то оно будет выглядеть следующим образом:"
                        },
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/9f0/410/ff0/9f0410ff0112c46102271deca19f9c18.png",
                            "subtitle": "Untitled"
                        },
                        {
                            "type": "text",
                            "html": "Как мы видим, Ionic по умолчанию применил Material Design, который в основном используется на Android-устройствах. Один раз при разработке проекта в <a href=\"https://firecode.ru/\" rel=\"noopener noreferrer nofollow\">Firecode</a> передо мной стояла задача сделать кроссплатформенное приложение (Android/iOS), компоненты Ionic буквально стали спасением, ибо их стиль меняется всего одной строкой кода:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// main.ts\n\n\nconst app = createApp(App)\n  .use(IonicVue, {\n    mode: 'ios',\n});"
                        },
                        {
                            "type": "text",
                            "html": "Теперь если мы посмотрим на нашу страницу, то увидим что таббар поменял свои стили, а шапка приложения стала прозрачной:"
                        },
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/b93/3d3/0b6/b933d30b6bddab422a4fd5151de86b80.png",
                            "subtitle": "Untitled"
                        },
                        {
                            "type": "text",
                            "html": "Ionic сделан на базе Stencil-компонентов. <a href=\"https://stenciljs.com/\" rel=\"noopener noreferrer nofollow\">Stencil</a> тоже входит в экосистему Ionic и используется для создания веб-компонентов. Если мы заглянем в DevTools и посмотрим на DOM-дерево, то увидим там следующее:"
                        },
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/87f/7a9/b92/87f7a9b92a61a3737d9a8a80d9686fb9.png",
                            "subtitle": "Untitled"
                        },
                        {
                            "type": "text",
                            "html": "Может показаться непривычным то, что вместо <code>header</code>, <code>footer</code> и кучи <code>div</code> ionic использует веб-компоненты, но со временем вы к этому привыкнете. Более того, это <a href=\"https://dev.to/ionic/why-we-use-web-components-2c1i\" rel=\"noopener noreferrer nofollow\">приносит определенные плюсы</a>."
                        },
                        {
                            "type": "text",
                            "html": "У ionic есть компоненты буквально для всего, что вам может понадобиться, в <a href=\"https://ionicframework.com/docs/components\" rel=\"noopener noreferrer nofollow\">документации находится их полный список</a>."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Роутинг"
                        },
                        {
                            "type": "text",
                            "html": "Наверняка используя приложения на своем смартфоне вы видели как выполняются переходы между экранами. У ionic есть встроенный функционал для роутеров, который позволяет нам реализовывать эти анимации."
                        },
                        {
                            "type": "text",
                            "html": "В данный момент, в нашем приложении есть только три таба. Давайте создадим новую страницу, назовем ее <code>HelloPage.vue</code>:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/views/HelloPage.vue\n\n<template>\n  <ion-page>\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Hello</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content :fullscreen=\"true\">\n      <ion-card>\n        <ion-card-content>\n          <ion-card-title>Страница приветствия</ion-card-title>\n          <ion-text>Данная страница создана для демонстрации роутинга</ion-text>\n        </ion-card-content>\n      </ion-card>\n    </ion-content>\n  </ion-page>\n</template>\n\n \n<script setup lang=\"ts\">\nimport { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonCard, IonCardTitle } from '@ionic/vue';\n</script>"
                        },
                        {
                            "type": "text",
                            "html": "Теперь нам нужно добавить запись в <code>router/index.ts</code>:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "const routes = [\n    // ...\n    {\n    path: '/hello',\n    component: () => import('@/views/HelloPage.vue'),\n  },\n    // ...\n]"
                        },
                        {
                            "type": "text",
                            "html": "Если мы перейдем на по адресу <code>/hello</code>, то увидим следующее:"
                        },
                        {
                            "type": "image",
                            "src": "https://habrastorage.org/r/w1560/getpro/habr/upload_files/941/145/c09/941145c095b2bbff6ac38551790ab73a.png",
                            "subtitle": "127.0.0.1_5173_hello.png"
                        },
                        {
                            "type": "text",
                            "html": "Теперь попробуем сделать переход со страницы на страницу с анимацией. Если мы просто будем использовать <code>vue-router</code>, то анимации не будет. Для того чтобы использовать анимацию перехода мы будем использовать composable, который нам предоставляет ionic:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/views/Tab1Page.vue\n\n<template>\n  <ion-page>\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Tab 1</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content :fullscreen=\"true\">\n      <ion-header collapse=\"condense\">\n        <ion-toolbar>\n          <ion-title size=\"large\">Tab 1</ion-title>\n        </ion-toolbar>\n      </ion-header>\n      <ion-button\n          expand=\"block\"\n          @click=\"onGoToHelloPage\"\n      >\n        Переход на страницу приветствия\n      </ion-button>\n    </ion-content>\n  </ion-page>\n</template>\n\n<script setup lang=\"ts\">\nimport { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';\nimport {useIonRouter} from \"@ionic/vue\";\n\nconst ionRouter = useIonRouter();\nconst onGoToHelloPage = () => {\n  ionRouter.push('/hello');\n}\n</script>"
                        },
                        {
                            "type": "text",
                            "html": "<code>useIonRouter</code> является надстройкой на <code>vue-router</code> и просто добавляет анимацию."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Плагины"
                        },
                        {
                            "type": "text",
                            "html": "Использование плагинов в Capacitor позволяет разработчикам расширить функциональность своего Ionic-приложения, добавив доступ к API телефона/планшета/другого устройства, таким как камера, геолокация, уведомления и многое другое. Плагины предоставляют абстракцию над нативными API платформы."
                        },
                        {
                            "type": "text",
                            "html": "Установка плагинов в Capacitor обычно осуществляется с помощью инструмента командной строки Capacitor CLI."
                        },
                        {
                            "type": "text",
                            "html": "После установки плагина, мы должны добавить соответствующий код в свое Ionic-приложение, чтобы использовать функциональность, предоставляемую плагином. Обычно это включает импорт плагина в соответствующий компонент и вызов его методов для взаимодействия с нативными возможностями устройства. Capacitor обеспечивает единообразный интерфейс для работы с плагинами на разных платформах, что упрощает разработку кросс-платформенных приложений."
                        },
                        {
                            "type": "text",
                            "html": "Вот пример с использованием плагина для камеры:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "import { Plugins } from '@capacitor/core';\n\nconst { Camera } = Plugins;\n\nasync function takePhoto() {\n  const image = await Camera.getPhoto({\n    quality: 90,\n    allowEditing: false,\n    resultType: 'base64'\n  });\n\n  // Дальнейшая обработка полученного изображения\n}"
                        },
                        {
                            "type": "text",
                            "html": "Вот пример с использованием плагина для камеры:"
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Вместо заключения 🌚"
                        },
                        {
                            "type": "text",
                            "html": "Если вам понравилась данная статья - то вы всегда можете&nbsp;<a href=\"https://t.me/developer_log\" rel=\"noopener noreferrer nofollow\">перейти в мой блог</a>, там больше схожей информации о веб-разработке."
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://firecode.ru/\" rel=\"noopener noreferrer nofollow\">Firecode</a> - это команда высококлассных программистов, которая помогает корпорациям и IT-компаниям создавать продукты для миллионов пользователей. Специалисты и команды разработчиков готовы подключиться к любому интересному проекту. У нас глубокая экспертиза в web и mobile, и это позволяет нам грамотно организовывать работу с проектом любого масштаба."
                        },
                        {
                            "type": "text",
                            "html": "Если у вас остались вопросы - не стесняйтесь задавать их в комментариях. Хорошего времяпрепровождения! 💁🏻‍♂"
                        }
                    ]),
                    createdAt: new Date('2024-05-04T00:00:00'),
                    updatedAt: new Date('2024-05-04T00:00:00'),
                },
                {
                    id: 4,
                    title: "5 трендов в веб-разработке 2024 года",
                    views: 2100,
                    userId: 1,
                    image: "https://e7.pngegg.com/pngimages/829/909/png-clipart-delhi-web-development-web-design-web-developer-business-web-design-search-engine-optimization-web-design.png",
                    blocks: JSON.stringify([
                        {
                            "type": "image",
                            "src": "https://workspace.ru/upload/iblock/3ef/py2ql4xlsx0lzialp58p1mr27rjlqpcd/0.jpg",
                            "subtitle": "Тренды веб-разработки"
                        },
                        {
                            "type": "text",
                            "html": "Каждый год в веб-разработке появляются новые тенденции. Рассмотрим пять ключевых трендов, которые будут популярны в 2024 году."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "1. Прогрессивные веб-приложения (PWA)"
                        },
                        {
                            "type": "text",
                            "html": "PWA становятся все более популярными, предлагая пользователям нативные возможности на всех устройствах."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "2. Серверные компоненты в React"
                        },
                        {
                            "type": "text",
                            "html": "Новая функция React позволит создавать компоненты, которые рендерятся на сервере для повышения производительности."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "3. Использование AI и ML в веб-разработке"
                        },
                        {
                            "type": "text",
                            "html": "Искусственный интеллект и машинное обучение все чаще используются для создания умных и адаптивных интерфейсов."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "4. Веб-ассистенты и голосовые интерфейсы"
                        },
                        {
                            "type": "text",
                            "html": "Голосовые интерфейсы становятся важной частью пользовательского опыта, позволяя взаимодействовать с веб-приложениями голосом."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "5. Повсеместное использование TypeScript"
                        },
                        {
                            "type": "text",
                            "html": "TypeScript продолжает набирать популярность среди разработчиков благодаря своим преимуществам в типизации и улучшенной поддержке инструментов."
                        },
                        {
                            "type": "text",
                            "html": "Следите за этими трендами, чтобы оставаться на волне современных технологий и создавать инновационные веб-приложения."
                        }
                    ]),
                    createdAt: new Date('2024-01-01T00:00:00'),
                    updatedAt: new Date('2024-01-01T00:00:00'),
                },
                {
                    id: 5,
                    title: "Создание REST API с использованием NestJS и MongoDB",
                    views: 7200,
                    userId: 1, // 2
                    image: "https://pbs.twimg.com/profile_images/1110148780991623201/vlqCsAVP_400x400.png",
                    blocks: JSON.stringify([
                        {
                            "type": "text",
                            "html": "NestJS — это прогрессивный фреймворк для создания эффективных, надежных и масштабируемых серверных приложений с использованием Node.js. В этой статье мы рассмотрим процесс создания REST API с использованием NestJS и MongoDB."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Что такое NestJS?"
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://nestjs.com/\" rel=\"noopener noreferrer nofollow\"><strong>NestJS</strong></a> — это фреймворк для создания серверных приложений, построенный на Node.js и TypeScript. Он использует архитектурные принципы Angular и предоставляет мощные средства для построения масштабируемых серверных приложений."
                        },
                        {
                            "type": "text",
                            "html": "NestJS обладает следующими ключевыми особенностями:"
                        },
                        {
                            "type": "list",
                            "mode": "li",
                            "list": [
                                "<strong>Модульная структура</strong>: NestJS использует модульный подход к разработке, что упрощает организацию и поддержку кода.",
                                "<strong>Инжектирование зависимостей</strong>: В NestJS используется встроенная система инжектирования зависимостей, что упрощает тестирование и модульное тестирование.",
                                "<strong>Поддержка TypeScript</strong>: NestJS написан на TypeScript, что обеспечивает типизацию и автодополнение кода.",
                                "<strong>Интеграция с популярными библиотеками</strong>: NestJS легко интегрируется с различными популярными библиотеками и фреймворками, такими как TypeORM, Mongoose и GraphQL."
                            ]
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Что такое MongoDB?"
                        },
                        {
                            "type": "text",
                            "html": "<a href=\"https://www.mongodb.com/\" rel=\"noopener noreferrer nofollow\"><strong>MongoDB</strong></a> — это NoSQL база данных, которая обеспечивает высокую производительность, масштабируемость и гибкость. MongoDB хранит данные в виде документов JSON-подобного формата, что делает её идеальной для работы с данными, структура которых может меняться."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Начало работы над проектом"
                        },
                        {
                            "type": "text",
                            "html": "Для начала создадим новый проект с использованием NestJS CLI. Убедитесь, что у вас установлен <a href=\"https://nodejs.org/\" rel=\"noopener noreferrer nofollow\">Node.js</a> и <a href=\"https://www.npmjs.com/package/@nestjs/cli\" rel=\"noopener noreferrer nofollow\">@nestjs/cli</a>:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npm i -g @nestjs/cli\nnest new project-name"
                        },
                        {
                            "type": "text",
                            "html": "После создания проекта, установим необходимые пакеты для работы с MongoDB:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npm install --save @nestjs/mongoose mongoose"
                        },
                        {
                            "type": "text",
                            "html": "Теперь создадим модуль для работы с базой данных. В файле <code>app.module.ts</code> добавим подключение к MongoDB:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "import { Module } from '@nestjs/common';\nimport { MongooseModule } from '@nestjs/mongoose';\n\n@Module({\n  imports: [\n    MongooseModule.forRoot('mongodb://localhost/nest')\n  ],\n})\nexport class AppModule {}"
                        },
                        {
                            "type": "text",
                            "html": "Далее создадим схему и модель данных для нашего API. В папке <code>src</code> создадим новую папку <code>cats</code> и внутри неё файлы <code>cat.schema.ts</code> и <code>cat.interface.ts</code>:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/cats/cat.schema.ts\nimport { Schema } from 'mongoose';\n\nexport const CatSchema = new Schema({\n  name: String,\n  age: Number,\n  breed: String,\n});"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/cats/cat.interface.ts\nimport { Document } from 'mongoose';\n\nexport interface Cat extends Document {\n  id?: string;\n  name: string;\n  age: number;\n  breed: string;\n}"
                        },
                        {
                            "type": "text",
                            "html": "Теперь создадим сервис и контроллер для нашего API. В папке <code>cats</code> создадим файлы <code>cats.service.ts</code> и <code>cats.controller.ts</code>:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/cats/cats.service.ts\nimport { Injectable } from '@nestjs/common';\nimport { InjectModel } from '@nestjs/mongoose';\nimport { Model } from 'mongoose';\nimport { Cat } from './cat.interface';\n\n@Injectable()\nexport class CatsService {\n  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}\n\n  async findAll(): Promise<Cat[]> {\n    return this.catModel.find().exec();\n  }\n\n  async create(cat: Cat): Promise<Cat> {\n    const newCat = new this.catModel(cat);\n    return newCat.save();\n  }\n}"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "// src/cats/cats.controller.ts\nimport { Controller, Get, Post, Body } from '@nestjs/common';\nimport { CatsService } from './cats.service';\nimport { Cat } from './cat.interface';\n\n@Controller('cats')\nexport class CatsController {\n  constructor(private readonly catsService: CatsService) {}\n\n  @Get()\n  async findAll(): Promise<Cat[]> {\n    return this.catsService.findAll();\n  }\n\n  @Post()\n  async create(@Body() cat: Cat) {\n    return this.catsService.create(cat);\n  }\n}"
                        },
                        {
                            "type": "text",
                            "html": "Теперь мы можем протестировать наш API с помощью Postman или любого другого инструмента для работы с HTTP-запросами. Запустите сервер и отправьте GET или POST запрос на <code>http://localhost:3000/cats</code>."
                        },
                        {
                            "type": "image",
                            "src": "https://miro.medium.com/v2/resize:fit:1400/1*VbsQkO9rA5e9A2-WnDJNXg.gif",
                            "subtitle": "Postman запрос"
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Вместо заключения"
                        },
                        {
                            "type": "text",
                            "html": "В этой статье мы рассмотрели основы создания REST API с использованием NestJS и MongoDB. NestJS предоставляет мощные инструменты и архитектурные подходы для создания масштабируемых серверных приложений, а MongoDB обеспечивает гибкость и производительность для работы с данными. Если вам понравилась статья, не забудьте заглянуть в <a href=\"https://t.me/developer_log\" rel=\"noopener noreferrer nofollow\">мой блог</a> для получения дополнительной информации и примеров."
                        }
                    ]),
                    createdAt: new Date('2024-06-01T00:00:00'),
                    updatedAt: new Date('2024-06-01T00:00:00'),
                },
                {
                    id: 6,
                    title: "Создание мобильных приложений с использованием React Native и TypeScript",
                    views: 7300,
                    userId: 1, // 2
                    image: "https://miro.medium.com/v2/resize:fit:1400/1*C-zKlgOdeh4siIsNB7hE0g.jpeg",
                    blocks: JSON.stringify([
                        {
                            "type": "text",
                            "html": "React Native позволяет разработчикам создавать мобильные приложения, использующие JavaScript и React. Используя TypeScript, мы можем добавить статическую типизацию к нашим приложениям, что помогает избежать ошибок и улучшить качество кода. В этой статье мы рассмотрим, как начать разработку мобильных приложений с использованием React Native и TypeScript."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Начало работы с React Native"
                        },
                        {
                            "type": "text",
                            "html": "React Native — это фреймворк для разработки мобильных приложений с использованием JavaScript и React. Он позволяет создавать приложения, которые работают на обеих платформах — iOS и Android, используя один и тот же код. Основное преимущество React Native заключается в том, что он использует нативные компоненты, что позволяет достичь высокой производительности и пользовательского опыта."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Установка и настройка окружения"
                        },
                        {
                            "type": "text",
                            "html": "Для начала работы с React Native необходимо установить Node.js и npm (или Yarn). После этого можно установить CLI React Native:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npm install -g react-native-cli"
                        },
                        {
                            "type": "text",
                            "html": "Теперь мы можем создать новый проект React Native с поддержкой TypeScript:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npx react-native init MyApp --template react-native-template-typescript"
                        },
                        {
                            "type": "text",
                            "html": "Это создаст новый проект React Native с уже настроенной поддержкой TypeScript."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Компоненты и стилизация"
                        },
                        {
                            "type": "text",
                            "html": "В React Native мы создаем компоненты так же, как и в React, используя JavaScript или TypeScript. Стилизация компонентов осуществляется с помощью встроенного объекта <code>StyleSheet</code> или библиотек, таких как <code>styled-components</code>. Рассмотрим простой пример компонента:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nconst App = () => {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Hello, React Native!</Text>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    backgroundColor: '#F5FCFF',\n  },\n  text: {\n    fontSize: 20,\n    textAlign: 'center',\n    margin: 10,\n  },\n});\n\nexport default App;"
                        },
                        {
                            "type": "text",
                            "html": "Этот код создает простой компонент, который отображает текст в центре экрана."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Навигация"
                        },
                        {
                            "type": "text",
                            "html": "Для управления навигацией в React Native приложениях часто используется библиотека <code>React Navigation</code>. Установим ее:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "npm install @react-navigation/native\nnpm install @react-navigation/stack"
                        },
                        {
                            "type": "text",
                            "html": "Теперь мы можем создать стек навигации и добавить экраны:"
                        },
                        {
                            "type": "code",
                            "language": "JavaScript",
                            "code": "import * as React from 'react';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createStackNavigator } from '@react-navigation/stack';\nimport HomeScreen from './screens/HomeScreen';\nimport DetailsScreen from './screens/DetailsScreen';\n\nconst Stack = createStackNavigator();\n\nfunction App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator initialRouteName=\"Home\">\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\nexport default App;"
                        },
                        {
                            "type": "text",
                            "html": "Теперь у нас есть базовая структура для навигации между экранами в приложении."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Использование TypeScript"
                        },
                        {
                            "type": "text",
                            "html": "TypeScript позволяет нам использовать статическую типизацию, что помогает избежать ошибок и улучшить качество кода. Рассмотрим пример компонента с использованием TypeScript:"
                        },
                        {
                            "type": "code",
                            "language": "TypeScript",
                            "code": "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\ninterface Props {\n  message: string;\n}\n\nconst MessageComponent: React.FC<Props> = ({ message }) => {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>{message}</Text>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    backgroundColor: '#F5FCFF',\n  },\n  text: {\n    fontSize: 20,\n    textAlign: 'center',\n    margin: 10,\n  },\n});\n\nexport default MessageComponent;"
                        },
                        {
                            "type": "text",
                            "html": "Этот компонент принимает проп <code>message</code> и отображает его в центре экрана."
                        },
                        {
                            "type": "title",
                            "size": "h5",
                            "title": "Заключение"
                        },
                        {
                            "type": "text",
                            "html": "Использование React Native и TypeScript позволяет создавать мощные и надежные мобильные приложения с улучшенной типизацией и высокой производительностью. Это отличный выбор для разработчиков, желающих использовать современные технологии и подходы."
                        }
                    ]),
                    createdAt: new Date('2024-06-01T00:00:00'),
                    updatedAt: new Date('2024-06-01T00:00:00'),
                },
            ]);
        }
        catch (e) {
            console.log(e)
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('articles', null, {});
    }
};
