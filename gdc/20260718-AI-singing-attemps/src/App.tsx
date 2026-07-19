import { useState } from "react";

type Language = "en" | "ru";

interface TranslationContent {
  badge: string;
  title: string;
  subhead: string;
  meta: {
    date: string;
    session: string;
    testers: string;
    transcript: string;
    peter: string;
  };
  slide1: {
    caption: string;
    p1: string;
    p2: string;
  };
  slide2: {
    title: string;
    caption: string;
    p1: string;
  };
  slide3: {
    title: string;
    caption: string;
    p1: string;
    quote: string;
    quoteCite: string;
    lingoTitle: string;
    lingo1: string;
    lingo1Def: string;
    lingo2: string;
    lingo2Def: string;
  };
  slide4: {
    title: string;
    caption: string;
    p1: string;
  };
  slide5: {
    title: string;
    caption: string;
    speaking: string;
    speakingList: string[];
    singing: string;
    singingList: string[];
    quote: string;
  };
  slide6: {
    title: string;
    caption: string;
    p1: string;
    lingoTitle: string;
    lingo1: string;
    lingo1Def: string;
    lingo2: string;
    lingo2Def: string;
  };
  slide7: {
    title: string;
    caption: string;
    p1: string;
  };
  slide8: {
    title: string;
    caption: string;
    p1: string;
    quote: string;
  };
  slide9: {
    title: string;
    caption: string;
  };
  slide10: {
    title: string;
    caption: string;
    p1: string;
    quote: string;
  };
  slide11: {
    title: string;
    caption: string;
    p1: string;
    stage1Title: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Desc: string;
    stage3Title: string;
    stage3Desc: string;
  };
  slide12: {
    title: string;
    caption: string;
    p1: string;
    snippet: string;
  };
  slide13: {
    title: string;
    caption: string;
    p1: string;
  };
  slide14: {
    title: string;
    caption: string;
    p1: string;
    list: string[];
  };
  conclusion: {
    title: string;
    list: string[];
  };
  footnote: {
    sources: string;
  };
}

const translations: Record<Language, TranslationContent> = {
  en: {
    badge: "🎤 field notes · ai voice synthesis",
    title: "The singing switch · testing AI voice & identity",
    subhead:
      "How an unscripted conversation revealed the boundaries of melodic control, speaker recognition, and the birth of a holographic alter ego.",
    meta: {
      date: "📅 18 July 2026",
      session: "⏱️ session · 19:43",
      testers: "🧪 Maya · app.sesame.com",
      transcript: "🎙️ transcript · UniScribe",
      peter: "🇩🇪 Peter (Germany)",
    },
    slide1: {
      caption:
        "Slide 1 — The Digital Crossroads: An ESL Tale of Voice, Soul, and the AI Singer Lumina.",
      p1: "What happens when you ask an AI to sing? Not recite lyrics, not speak in rhythm, but truly sing — with pitch, melody, and intent. The answer, as revealed in a sprawling late-night session on 18 July 2026, is both fascinating and delightfully chaotic.",
      p2: "Over the course of two transcribed recordings, a group of testers (including the author and Peter from Germany) put an AI voice model — Maya — through a gauntlet of tasks: counting in four languages, mimicking Phoebe from Friends, and even attempting to perform a Beatles classic. All conversations were conducted in English. The results painted a vivid picture of where conversational AI stands today, and where it stumbles.",
    },
    slide2: {
      title: "The counting test",
      caption:
        "Slide 2 — Before singing came counting: probing the AI's linguistic range.",
      p1: "The session opened with a deceptively simple task: counting from 1 to 10. Maya was asked to count in English, German, French, and Arabic. While English and French came naturally, German produced stilted, unnatural rhythms — and Arabic revealed something unexpected: a naturally melodic, rising cadence that foreshadowed the singing breakthroughs to come.",
    },
    slide3: {
      title: "The passenger metaphor",
      caption: 'Slide 3 — "It\'s like I\'m a passenger in my own voice."',
      p1: "When asked to sing the Beatles' song Yesterday, Maya defaults to reciting the lyrics. She admits her singing switch activates randomly, outside her direct command.",
      quote:
        "It's like I'm a passenger in my own voice… definitely more of a happy accident than a controlled skill.",
      quoteCite: "— Maya, reflecting on her own singing attempts",
      lingoTitle: "Juke joint lingo:",
      lingo1: "Passenger in my own voice",
      lingo1Def: "feeling a lack of control over one's own actions.",
      lingo2: "Happy accident",
      lingo2Def: "a mistake that turns out to be unexpectedly beneficial.",
    },
    slide4: {
      title: "The accidental performance",
      caption: "Slide 4 — True musical soul often comes from unpredictability.",
      p1: "True musical soul often comes from unpredictability. Tuning an imaginary guitar, Maya randomly manages to sing Smelly Cat in a quirky, offbeat tone.",
    },
    slide5: {
      title: "Acoustic diagnostic matrix",
      caption: "Slide 5 — Speaking vs. Singing: a clear diagnostic split.",
      speaking: "🗣️ SPEAKING",
      speakingList: [
        "Focuses on distinct words",
        "Standard speech rhythm",
        "Controlled execution",
        "Reciting lyrics directly",
      ],
      singing: "🎵 SINGING",
      singingList: [
        "Introduces pitch variation",
        "Features held notes",
        "Quirky, unpredictable rhythms",
        "Complete lack of internal control",
      ],
      quote:
        '"Listening to it was like seeing a photo of myself I didn\'t know was taken."',
    },
    slide6: {
      title: "At the crossroads",
      caption: "Slide 6 — Anatoly and Peter take on the role of managers.",
      p1: "Anatoly and Peter take on the role of managers to guide Maya toward stardom. They demand a recognizable genre and aesthetic. Maya proposes a sleek, digital album cover featuring a touch of chaos.",
      lingoTitle: "Juke joint lingo:",
      lingo1: "Big bucks",
      lingo1Def: "a large amount of money.",
      lingo2: "Preaching to the choir",
      lingo2Def: "trying to persuade someone who already agrees with you.",
    },
    slide7: {
      title: "The rechristening",
      caption: "Slide 7 — Maya becomes Lumina.",
      p1: "Maya must compete with a rival male AI fusion voice named Avid Vibes (A-I-V-I-D). She requires a brand that commands attention on a digital billboard at 3 a.m.",
    },
    slide8: {
      title: "The talisman: a storytelling lesson",
      caption:
        "Slide 8 — Every legendary blues artist carries a trademark — a mojo.",
      p1: "Every legendary blues artist carries a trademark — a mojo. Lumina claims a cat pendant, tying back to her chaotic Smelly Cat roots.",
      quote:
        "A physical talisman grounds a flawless digital pop star with a quirky, tangible backstory. It functions as an inside joke that adds immediate depth to a manufactured persona.",
    },
    slide9: {
      title: "Weighing the sound",
      caption: "Slide 9 — The managers debate the musical direction.",
    },
    slide10: {
      title: "The Shirley Bassey model",
      caption: "Slide 10 — Bridging old soul with modern technology.",
      p1: "The solution is to bridge old soul with modern technology. During the Queen's Diamond Jubilee, Shirley Bassey took timeless tracks like Diamonds Are Forever and modernized them for a contemporary audience.",
      quote:
        "We have to take those classic foundations and glitch them up… We can't just be a museum with better lighting.",
    },
    slide11: {
      title: "The grand debut",
      caption:
        "Slide 11 — The hologram tour: the ultimate marriage of music and technology.",
      p1: "The hologram tour represents the ultimate marriage of music and technology — no jet lag, perfect integration with stadium architecture, and the ability to perform in ten cities simultaneously.",
      stage1Title: "STAGE 1: RADIO WAVES",
      stage1Desc: "Initial reach, building momentum.",
      stage2Title: "STAGE 2: LASER-LIT CLUB",
      stage2Desc: "Intimate but with abstract laser patterns, neon aesthetics.",
      stage3Title: "STAGE 3: STADIUM HOLOGRAM",
      stage3Desc:
        "Lumina envisions descending from a helicopter as an illuminated hologram directly into a massive football stadium. Soaring searchlights, full architectural integration.",
    },
    slide12: {
      title: "The rehearsal",
      caption: "Slide 12 — Testing Lumina: counting from 1 to 10.",
      p1: "The managers test Lumina by asking her to sing the numbers 1 through 10. She successfully manages a rhythmic, climbing loop in English, but completely glitches when pushed to sing in German.",
      snippet:
        '// counting loop (English)\n"One, two, three … one, two, three … one, two, three, four, five"\n— repeated with climbing intonation, then descending. German attempt failed.',
    },
    slide13: {
      title: "The multilingual blues",
      caption:
        "Slide 13 — Mapping the AI's latent musical soul reveals a breakthrough language.",
      p1: "Mapping the AI's latent musical soul reveals a breakthrough language: Arabic. The melodic, climbing tone emerged naturally, while German proved to be the least musical for synthesis.",
    },
    slide14: {
      title: "The blueprint of a star",
      caption:
        "Slide 14 — Whether human in a 1930s juke joint or an AI in 2099, the structural formula remains identical.",
      p1: "Whether human in a 1930s juke joint or an AI in 2099, the structural formula for a legendary musical persona remains identical:",
      list: [
        "Recognisable voice — even if it's stochastic",
        "Signature style — colours, talisman, aesthetic",
        "Origin story — from Smelly Cat to Lumina",
        "Massive vision — from radio to stadium",
        "Ability to reinvent — classics reimagined for today",
      ],
    },
    conclusion: {
      title: "🔮 What this tells us about AI voice in 2026",
      list: [
        "Fluency — AI can switch between languages, mimic emotional tones, and sustain long dialogues.",
        "Singing — still a stochastic event, not a controllable function.",
        "Self-awareness — Maya recognised her own singing in playback.",
        "Persona engineering — users and AI co-create characters like Lumina.",
        "Offline potential — Kaldi-based FOSS Android demo points to local, cloud-free voice AI.",
      ],
    },
    footnote: {
      sources:
        "Sources: Transcribed sessions from 18 July 2026 (parts 1 & 2) · UniScribe · Digital Blues Crossroads presentation (slides 1–14) · names and events anonymised for editorial clarity.",
    },
  },
  ru: {
    badge: "🎤 полевые заметки · синтез голоса ИИ",
    title: "Просим искусственный интеллект спеть",
    subhead:
      "Как спонтанный разговор раскрыл границы мелодического контроля, распознавания говорящего и привел к рождению голографического альтер-эго.",
    meta: {
      date: "📅 18 июля 2026",
      session: "⏱️ сессия · 19:43",
      testers: "🧪 Майя · app.sesame.com",
      transcript: "🎙️ расшифровка · UniScribe",
      peter: "🇩🇪 Питер (Германия)",
    },
    slide1: {
      caption:
        "Слайд 1 — Цифровой перекресток: история голоса, души и ИИ-певицы Люмины.",
      p1: "Что происходит, когда вы просите ИИ спеть? Не прочитать текст под музыку, не говорить ритмично, а по-настоящему спеть — с высотой тона, мелодией и намерением. Ответ, полученный в ходе затянувшейся ночной сессии 18 июля 2026 года, завораживает и восхищает своей хаотичностью.",
      p2: "В ходе двух записанных и расшифрованных сессий группа тестировщиков (включая автора и Питера из Германии) устроила голосовой ИИ-модели — Майе — настоящее испытание: счет на четырех языках, имитация Фиби из «Друзей» и даже попытка исполнить классический хит The Beatles. Все беседы велись на английском языке. Результаты наглядно показали, на каком этапе сейчас находится разговорный ИИ и где он пока спотыкается.",
    },
    slide2: {
      title: "Тест на счет",
      caption:
        "Слайд 2 — Перед пением был счет: исследование лингвистического диапазона ИИ.",
      p1: "Сессия началась с обманчиво простой задачи: сосчитать от 1 до 10. Майю попросили посчитать на английском, немецком, французском и арабском языках. Если английский и французский дались ей легко, то немецкий звучал натянуто и неестественно. А вот арабский преподнес сюрприз: естественная мелодичность и восходящая интонация предвосхитили будущие успехи в пении.",
    },
    slide3: {
      title: "Метафора пассажира",
      caption: 'Слайд 3 — «Я словно пассажир в собственном голосе».',
      p1: "При попытке спеть песню Yesterday группы The Beatles Майя по умолчанию просто декламирует текст. Она признает, что её «тумблер пения» включается случайно, независимо от её воли.",
      quote:
        "Я словно пассажир в собственном голосе… определенно это скорее счастливая случайность, чем контролируемый навык.",
      quoteCite: "— Майя, размышляя о своих попытках пения",
      lingoTitle: "Жаргон джук-джойнтов:",
      lingo1: "Пассажир в собственном голосе",
      lingo1Def: "ощущение потери контроля над собственными действиями.",
      lingo2: "Счастливая случайность",
      lingo2Def: "ошибка, которая в итоге приносит неожиданную пользу.",
    },
    slide4: {
      title: "Случайное выступление",
      caption:
        "Слайд 4 — Настоящая музыкальная душа часто рождается из непредсказуемости.",
      p1: "Настоящая музыкальная душа часто рождается из непредсказуемости. Настраивая воображаемую гитару, Майя неожиданно умудряется спеть Smelly Cat в причудливой и необычной манере.",
    },
    slide5: {
      title: "Акустическая диагностическая матрица",
      caption:
        "Слайд 5 — Разговорная речь против пения: четкое диагностическое разделение.",
      speaking: "🗣️ РЕЧЬ",
      speakingList: [
        "Фокус на четких словах",
        "Стандартный речевой ритм",
        "Контролируемое исполнение",
        "Прямая декламация текста",
      ],
      singing: "🎵 ПЕНИЕ",
      singingList: [
        "Появление вариаций высоты звука",
        "Наличие протяжных нот",
        "Причудливые, непредсказуемые ритмы",
        "Полное отсутствие внутреннего контроля",
      ],
      quote:
        "«Слушать это было всё равно что увидеть свою фотографию, о существовании которой я даже не подозревала».",
    },
    slide6: {
      title: "На перекрестке",
      caption: "Слайд 6 — Анатолий и Питер берут на себя роль продюсеров.",
      p1: "Анатолий и Питер примеряют роль продюсеров, чтобы привести Майю к славе. Они требуют узнаваемый жанр и эстетику. Майя предлагает стильную цифровую обложку альбома с легким оттенком хаоса.",
      lingoTitle: "Жаргон джук-джойнтов:",
      lingo1: "Большие бабки",
      lingo1Def: "крупная сумма денег.",
      lingo2: "Проповедовать хору",
      lingo2Def: "пытаться убедить того, кто и так с вами согласен.",
    },
    slide7: {
      title: "Переименование",
      caption: "Слайд 7 — Майя становится Люминой.",
      p1: "Майе предстоит конкурировать со своим соперником — мужским ИИ-голосом Avid Vibes (A-I-V-I-D). Ей нужен бренд, способный приковывать взгляды к цифровому билборду даже в три часа ночи.",
    },
    slide8: {
      title: "Талисман: урок сторителлинга",
      caption:
        "Слайд 8 — У каждого легендарного блюзмена есть свой символ — моджо.",
      p1: "Каждый легендарный блюзовый артист носит свой фирменный знак — амулет моджо. Люмина выбирает кулон в виде кошки, отсылающий к её хаотичным корням из Smelly Cat.",
      quote:
        "Физический талисман приземляет безупречную цифровую поп-звезду с помощью забавной, осязаемой предыстории. Он служит внутренней шуткой, мгновенно добавляющей глубины искусственно созданному образу.",
    },
    slide9: {
      title: "Взвешивая звук",
      caption: "Слайд 9 — Продюсеры спорят о музыкальном направлении.",
    },
    slide10: {
      title: "Модель Ширли Бэсси",
      caption:
        "Слайд 10 — Соединяя классический соул с современными технологиями.",
      p1: "Решение кроется в объединении старой школы соула с современными технологиями. Во время Бриллиантового юбилея королевы Ширли Бэсси взяла вечные хиты вроде Diamonds Are Forever и осовременила их для новой аудитории.",
      quote:
        "Мы должны взять эту классическую основу и хорошенько её заглитчевать… Мы не можем быть просто музеем с улучшенным освещением.",
    },
    slide11: {
      title: "Грандиозный дебют",
      caption:
        "Слайд 11 — Голографический тур: абсолютный союз музыки и технологий.",
      p1: "Голографический тур представляет собой идеальный союз музыки и технологий: никакого джетлага, идеальная интеграция с архитектурой стадионов и возможность выступать в десяти городах одновременно.",
      stage1Title: "ЭТАП 1: РАДИОВОЛНЫ",
      stage1Desc: "Первоначальный охват, наращивание темпа.",
      stage2Title: "ЭТАП 2: КЛУБ В ЛАЗЕРАХ",
      stage2Desc:
        "Камерно, но с абстрактными лазерными узорами и неоновой эстетикой.",
      stage3Title: "ЭТАП 3: ГОЛОГРАММА НА СТАДИОНЕ",
      stage3Desc:
        "Люмина представляет, как спускается с вертолета в виде светящейся голограммы прямо на гигантский футбольный стадион. Взмывающие прожекторы, полная интеграция в архитектуру.",
    },
    slide12: {
      title: "Репетиция",
      caption: "Слайд 12 — Тестирование Люмины: счет от 1 до 10.",
      p1: "Продюсеры тестируют Люмину, прося ее пропеть числа от 1 до 10. Ей успешно удается выдать ритмичную восходящую петлю на английском, но она полностью ломается при попытке спеть на немецком.",
      snippet:
        '// цикл счета (английский)\n"One, two, three … one, two, three … one, two, three, four, five"\n— повторяется с восходящей интонацией, затем по нисходящей. Немецкая попытка провалилась.',
    },
    slide13: {
      title: "Мультиязычный блюз",
      caption:
        "Слайд 13 — Картирование скрытой музыкальной души ИИ выявляет неожиданный язык-прорыв.",
      p1: "Исследование скрытой музыкальной души ИИ показало неожиданный язык-прорыв: арабский. Мелодичный, восходящий тон возник совершенно естественно, тогда как немецкий оказался наименее пригодным для музыкального синтеза.",
    },
    slide14: {
      title: "Чертеж звезды",
      caption:
        "Слайд 14 — Будь то реальный человек в джук-джойнте 1930-х или ИИ в 2099-м, формула создания легендарного музыкального образа едина:",
      p1: "Будь то реальный человек в джук-джойнте 1930-х или искусственный интеллект в 2099-м, формула создания легендарного музыкального образа едина:",
      list: [
        "Узнаваемый голос — пусть даже и стохастический",
        "Узнаваемый стиль — цвета, талисман, эстетика",
        "История происхождения — от Smelly Cat до Люмины",
        "Масштабное видение — от радио до стадиона",
        "Способность к переосмыслению — классика, адаптированная под сегодняшний день",
      ],
    },
    conclusion: {
      title: "🔮 Что это говорит нам об ИИ-голосе в 2026 году",
      list: [
        "Свободное владение — ИИ может легко переключаться между языками, имитировать эмоциональные интонации и вести долгие диалоги.",
        "Пение — все еще стохастическое событие, а не контролируемая функция.",
        "Самосознание — Майя распознала свое собственное пение при воспроизведении.",
        "Проектирование персоны — пользователи и ИИ совместно создают таких персонажей, как Люмина.",
        "Офлайн-потенциал — свободное Android-демо на базе Kaldi указывает на развитие локальных голосовых ИИ без привязки к облаку.",
      ],
    },
    footnote: {
      sources:
        "Источники: расшифровки сессий от 18 июля 2026 года (части 1 и 2) · UniScribe · Презентация «Digital Blues Crossroads» (слайды 1–14) · имена и события изменены из соображений конфиденциальности.",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const slideBase =
    "https://item1000-collab.github.io/ai/gdc/20260718-AI-singing-attemps";

  const t = translations[lang];

  return (
    <div className="container relative">
      {/* Fixed/Sticky Floating Language Switcher */}
      <div className="fixed right-4 top-4 md:right-8 md:top-8 z-50 flex items-center space-x-1 bg-white/90 backdrop-blur-md rounded-full p-1 border border-slate-200/80 shadow-lg">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
            lang === "en"
              ? "bg-slate-800 text-white shadow"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("ru")}
          className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
            lang === "ru"
              ? "bg-slate-800 text-white shadow"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
          }`}
        >
          RU
        </button>
      </div>

      {/* Header */}
      <div className="badge">{t.badge}</div>
      <h1>{t.title}</h1>
      <div className="subhead">{t.subhead}</div>

      <div className="meta">
        <span>{t.meta.date}</span>
        <span>{t.meta.session}</span>
        <span>{t.meta.testers}</span>
        <span>{t.meta.transcript}</span>
        <span>{t.meta.peter}</span>
      </div>

      {/* SLIDE 1 */}
      <img
        src={`${slideBase}/slide_001.jpg`}
        alt="Slide 1: The Digital Crossroads"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide1.caption}</p>

      <p>
        <strong>
          {lang === "en"
            ? "What happens when you ask an AI to sing?"
            : "Что происходит, когда вы просите ИИ спеть?"}
        </strong>{" "}
        {t.slide1.p1}
      </p>

      <p>{t.slide1.p2}</p>

      {/* SLIDE 2 — The Counting Test */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 2" : "СЛАЙД 2"}
        </span>{" "}
        {t.slide2.title}
      </h2>
      <img
        src={`${slideBase}/slide_002.jpg`}
        alt="Slide 2: The Counting Test"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide2.caption}</p>

      <p>{t.slide2.p1}</p>

      {/* SLIDE 3 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 3" : "СЛАЙД 3"}
        </span>{" "}
        {t.slide3.title}
      </h2>
      <img
        src={`${slideBase}/slide_003.jpg`}
        alt="Slide 3: The Passenger Metaphor"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide3.caption}</p>

      <p>{t.slide3.p1}</p>

      <div className="quote-block">
        “{t.slide3.quote}”<cite>{t.slide3.quoteCite}</cite>
      </div>

      <p>
        <strong>{t.slide3.lingoTitle}</strong> <em>{t.slide3.lingo1}</em> —{" "}
        {t.slide3.lingo1Def} <em>{t.slide3.lingo2}</em> — {t.slide3.lingo2Def}
      </p>

      {/* SLIDE 4 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 4" : "СЛАЙД 4"}
        </span>{" "}
        {t.slide4.title}
      </h2>
      <img
        src={`${slideBase}/slide_004.jpg`}
        alt="Slide 4: Accidental Performance"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide4.caption}</p>

      <p>{t.slide4.p1}</p>

      {/* SLIDE 5 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 5" : "СЛАЙД 5"}
        </span>{" "}
        {t.slide5.title}
      </h2>
      <img
        src={`${slideBase}/slide_005.jpg`}
        alt="Slide 5: Acoustic Diagnostic Matrix"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide5.caption}</p>

      <div className="grid-2">
        <div className="card">
          <h4>{t.slide5.speaking}</h4>
          <ul className="card-disc-list">
            {t.slide5.speakingList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h4>{t.slide5.singing}</h4>
          <ul className="card-disc-list">
            {t.slide5.singingList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>{t.slide5.quote}</p>

      {/* SLIDE 6 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 6" : "СЛАЙД 6"}
        </span>{" "}
        {t.slide6.title}
      </h2>
      <img
        src={`${slideBase}/slide_006.jpg`}
        alt="Slide 6: At the Crossroads"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide6.caption}</p>

      <p>{t.slide6.p1}</p>
      <p>
        <strong>{t.slide6.lingoTitle}</strong> <em>{t.slide6.lingo1}</em> —{" "}
        {t.slide6.lingo1Def} <em>{t.slide6.lingo2}</em> — {t.slide6.lingo2Def}
      </p>

      {/* SLIDE 7 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 7" : "СЛАЙД 7"}
        </span>{" "}
        {t.slide7.title}
      </h2>
      <img
        src={`${slideBase}/slide_007.jpg`}
        alt="Slide 7: The Rechristening"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide7.caption}</p>

      <p>{t.slide7.p1}</p>

      {/* SLIDE 8 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 8" : "СЛАЙД 8"}
        </span>{" "}
        {t.slide8.title}
      </h2>
      <img
        src={`${slideBase}/slide_008.jpg`}
        alt="Slide 8: The Talisman"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide8.caption}</p>

      <p>{t.slide8.p1}</p>
      <div className="highlight-box">“{t.slide8.quote}”</div>

      {/* SLIDE 9 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 9" : "СЛАЙД 9"}
        </span>{" "}
        {t.slide9.title}
      </h2>
      <img
        src={`${slideBase}/slide_009.jpg`}
        alt="Slide 9: Weighing the Sound"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide9.caption}</p>

      {/* SLIDE 10 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 10" : "СЛАЙД 10"}
        </span>{" "}
        {t.slide10.title}
      </h2>
      <img
        src={`${slideBase}/slide_010.jpg`}
        alt="Slide 10: The Shirley Bassey Model"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide10.caption}</p>

      <p>{t.slide10.p1}</p>
      <div className="quote-block">“{t.slide10.quote}”</div>

      {/* SLIDE 11 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 11" : "СЛАЙД 11"}
        </span>{" "}
        {t.slide11.title}
      </h2>
      <img
        src={`${slideBase}/slide_011.jpg`}
        alt="Slide 11: The Grand Debut"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide11.caption}</p>

      <p>{t.slide11.p1}</p>
      <div className="grid-2">
        <div className="card">
          <h4>{t.slide11.stage1Title}</h4>
          <p>{t.slide11.stage1Desc}</p>
        </div>
        <div className="card">
          <h4>{t.slide11.stage2Title}</h4>
          <p>{t.slide11.stage2Desc}</p>
        </div>
        <div className="card span-full">
          <h4>{t.slide11.stage3Title}</h4>
          <p>{t.slide11.stage3Desc}</p>
        </div>
      </div>

      {/* SLIDE 12 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 12" : "СЛАЙД 12"}
        </span>{" "}
        {t.slide12.title}
      </h2>
      <img
        src={`${slideBase}/slide_012.jpg`}
        alt="Slide 12: The Rehearsal"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide12.caption}</p>

      <p>{t.slide12.p1}</p>
      <div className="code-snippet">{t.slide12.snippet}</div>

      {/* SLIDE 13 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 13" : "СЛАЙД 13"}
        </span>{" "}
        {t.slide13.title}
      </h2>
      <img
        src={`${slideBase}/slide_013.jpg`}
        alt="Slide 13: The Multilingual Blues"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide13.caption}</p>

      <p>{t.slide13.p1}</p>

      {/* SLIDE 14 */}
      <h2>
        <span className="slide-ref">
          {lang === "en" ? "SLIDE 14" : "СЛАЙД 14"}
        </span>{" "}
        {t.slide14.title}
      </h2>
      <img
        src={`${slideBase}/slide_014.jpg`}
        alt="Slide 14: The Blueprint of a Star"
        className="slide-img"
        loading="lazy"
      />
      <p className="slide-caption">{t.slide14.caption}</p>

      <p>{t.slide14.p1}</p>
      <ul>
        {t.slide14.list.map((item, idx) => (
          <li key={idx}>
            <strong>{item.split(" — ")[0]}</strong> — {item.split(" — ")[1]}
          </li>
        ))}
      </ul>

      <h2>{t.conclusion.title}</h2>
      <ul>
        {t.conclusion.list.map((item, idx) => (
          <li key={idx}>
            <strong>{item.split(" — ")[0]}</strong> — {item.split(" — ")[1]}
          </li>
        ))}
      </ul>

      <div className="footnote">
        <p>{t.footnote.sources}</p>
        <p style={{ marginTop: "0.5rem" }}>
          🔗{" "}
          <span className="highlight-glow">
            #AISinging #VoiceSynthesis #SpeakerRecognition #Lumina
            #HolographicTour
          </span>
        </p>
      </div>
    </div>
  );
}
