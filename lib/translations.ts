export type Lang = 'ru' | 'en' | 'de'

export const langMeta: Record<Lang, { label: string; short: string; dir: 'ltr' | 'rtl' }> = {
  ru: { label: 'Русский', short: 'RU', dir: 'ltr' },
  en: { label: 'English', short: 'EN', dir: 'ltr' },
  de: { label: 'Deutsch', short: 'DE', dir: 'ltr' },
}

export const langOrder: Lang[] = ['ru', 'en', 'de']

export function isLang(value: string | null): value is Lang {
  return value === 'ru' || value === 'en' || value === 'de'
}

export type Copy = {
  nav_story: string
  nav_songs: string
  nav_stories: string
  nav_youtube: string
  nav_contacts: string
  hero_eyebrow: string
  hero_line1: string
  hero_line2: string
  hero_subtitle: string
  hero_cta1: string
  hero_cta2: string
  opening: string
  phone_intro: string
  phone_incoming: string
  phone_video: string
  phone_name: string
  phone_decline: string
  phone_accept: string
  phone_quote1: string
  phone_bg_label: string
  phone_stan_label: string
  phone_left: string
  phone_sasha_left: string
  phone_msg_name: string
  phone_friend_preview: string
  phone_just_now: string
  phone_msg_text: string
  phone_narrative: string
  phone_olga: string
  chat_hi: string
  chat_hello: string
  chat_meet: string
  story_began: string
  story_began_l1: string
  story_began_l2: string
  four_label: string
  four_lines_word: string
  four_quote: string
  four_sang: string
  four_not_read: string
  four_not_disc: string
  four_sang_big: string
  word_title: string
  word_subtitle: string
  word_end: string
  word_words: string[]
  songs_count: string
  songs_tagline: string
  songs_listen_heading: string
  songs_play: string
  songs_lyrono: string
  langs_caption: string
  never_title: string
  never_reality: string
  never_text: string
  never_words: string[]
  never_final: string
  distance_label: string
  distance_line: string
  distance_author: string
  distance_performer: string
  distance_path: string
  valsok_caption: string
  valsok_steps: string[]
  valsok_final: string
  valsok_quote: string
  valsok_after: string
  seventy_label: string
  seventy_line1: string
  seventy_line2: string
  soul_quote1: string
  soul_quote2: string
  soul_band: string
  phil_title: string
  phil_line1: string
  phil_line2: string
  phil_line3: string
  phil_topics: string[]
  stories_title: string
  stories_intro: string
  finale_we_write: string
  finale_question: string
  finale_dont_know: string
  finale_pause: string
  finale_nobody: string
  finale_create: string
  finale_line1: string
  finale_line2: string
  finale_continues: string
  footer_tagline: string
  switch_lang: string
  menu_open: string
  menu_close: string
  copyright: string
}

export const t: Record<Lang, Copy> = {
  ru: {
    nav_story: 'История', nav_songs: 'Песни', nav_stories: 'Истории',
    nav_youtube: 'YouTube', nav_contacts: 'Контакты',
    hero_eyebrow: 'Ольга Рубан',
    hero_line1: 'Жизнь удивительна.',
    hero_line2: 'Нужно только уметь удивляться!',
    hero_subtitle: 'История одного случайного звонка, двух людей и сотен песен, которые однажды начали жить своей собственной жизнью.',
    hero_cta1: 'Наша история', hero_cta2: 'Слушать песни',
    opening: 'Всё началось с одного неожиданного звонка.',
    phone_intro: 'Подруга звонила Stan\'у по видео...',
    phone_incoming: 'Входящий видеозвонок', phone_video: 'Видеозвонок', phone_name: 'Stan',
    phone_decline: 'Отклонить', phone_accept: 'Принять',
    phone_quote1: '«Выключай это всё!»',
    phone_bg_label: 'На заднем фоне — Ольга',
    phone_stan_label: 'Stan слышал Ольгу и сказал',
    phone_left: 'Подруга ушла. Написала Ольге:',
    phone_sasha_left: 'Саша ушла. Написала Ольге:',
    phone_msg_name: 'Подруга', phone_friend_preview: 'Подруга', phone_just_now: 'только что',
    phone_msg_text: '«Ждите звонка»',
    phone_narrative: 'Stan написал Ольге',
    phone_olga: 'Ольга',
    chat_hi: 'Привет!', chat_hello: 'Здравствуйте.', chat_meet: 'Давай знакомиться.',
    story_began: 'Так началась эта история.',
    story_began_l1: 'Так началась', story_began_l2: 'эта история.',
    four_label: 'Мои первые 4 строки — Стэну',
    four_lines_word: 'строки',
    four_quote: 'Я — мираж...',
    four_sang: 'Он их спел.', four_not_read: 'Не прочитал.', four_not_disc: 'Не обсудил.', four_sang_big: 'Спел.',
    word_title: 'Кран открылся.',
    word_subtitle: 'Слова начали литься — и каждое слово становилось песней.',
    word_end: 'Слова превратились в песни. Песни — в жизни.',
    word_words: [
      'любовь', 'память', 'война', 'одиночество', 'радость',
      'потеря', 'надежда', 'жизнь', 'дорога', 'тишина',
      'свет', 'ночь', 'встреча', 'разлука', 'время',
      'голос', 'слово', 'сердце', 'небо', 'дом',
    ],
    songs_count: 'песен',
    songs_tagline: 'На семи языках. Для тысяч людей. Из одного звонка.',
    songs_listen_heading: 'Послушать',
    songs_play: 'Слушать',
    songs_lyrono: 'Послушать на Lyrono',
    langs_caption: 'Семь языков одной истории',
    never_title: 'Мы никогда не встречались.',
    never_reality: 'В реальности.',
    never_text: 'Но за это время мы успели увидеть друг друга такими, какими иногда не видят даже люди, живущие рядом.',
    never_words: ['Заспанными.','Уставшими.','Раздражёнными.','Больными.','Плачущими.','Смеющимися.'],
    never_final: 'Настоящими.',
    distance_label: 'Расстояние',
    distance_line: 'Людей разделяет расстояние. Но соединяет музыка.',
    distance_author: 'автор',
    distance_performer: 'исполнитель',
    distance_path: 'строка → нота → песня',
    valsok_caption: 'История одной песни',
    valsok_steps: ['Зал', 'Тишина', 'Дирижёр', 'Юноша', 'Девушка', 'Прикосновение рук', 'Музыка'],
    valsok_final: 'Вальс',
    valsok_quote: '«Пожалуйста, задержись».',
    valsok_after: 'Но время всё равно уйдёт.',
    seventy_label: 'человек остановились на этой песне',
    seventy_line1: 'Для кого-то это просто цифра.',
    seventy_line2: 'Для нас — первый знак того, что песни могут выйти за пределы нашего маленького мира.',
    soul_quote1: '«Ты вывернула мою душу наизнанку».',
    soul_quote2: '«Я навсегда стал твоим учеником».',
    soul_band: 'Мы хорошая банда.',
    phil_title: 'Почему мы пишем?',
    phil_line1: 'Мы пишем не только о себе.',
    phil_line2: 'Мы пишем о людях.',
    phil_line3: 'О том, что однажды случается почти с каждым:',
    phil_topics: ['о любви,','о потере,','о надежде,','о памяти,','о встречах,','о разлуке,','о жизни.'],
    stories_title: 'Истории',
    stories_intro: 'Некоторые песни начинаются не с музыки.\nОни начинаются с человека.',
    finale_we_write: 'Мы пишем...',
    finale_question: 'А что будет дальше?',
    finale_dont_know: 'Не знаю.',
    finale_pause: '— пауза —',
    finale_nobody: 'И, наверное, никто не знает.',
    finale_create: 'Но пока мы живы — мы можем творить.',
    finale_line1: 'Жизнь удивительна.',
    finale_line2: 'Нужно только уметь удивляться!',
    finale_continues: 'Наша история продолжается.',
    footer_tagline: 'Сделано из историй, музыки и человеческих чувств.',
    switch_lang: 'Язык',
    menu_open: 'Открыть меню',
    menu_close: 'Закрыть меню',
    copyright: '© Все стихи защищены авторским правом',
  },

  en: {
    nav_story: 'Story', nav_songs: 'Songs', nav_stories: 'Stories',
    nav_youtube: 'YouTube', nav_contacts: 'Contacts',
    hero_eyebrow: 'Olga Ruban',
    hero_line1: 'Life is wonderful.',
    hero_line2: 'You just have to know how to be amazed!',
    hero_subtitle: 'The story of one unexpected call, two people, and hundreds of songs that once began to live their own lives.',
    hero_cta1: 'Our story', hero_cta2: 'Listen to songs',
    opening: 'It all began with one unexpected call.',
    phone_intro: 'A friend was on a video call with Stan...',
    phone_incoming: 'Incoming video call', phone_video: 'Video call', phone_name: 'Stan',
    phone_decline: 'Decline', phone_accept: 'Accept',
    phone_quote1: '"Turn all this off!"',
    phone_bg_label: 'In the background — Olga',
    phone_stan_label: 'Stan heard Olga and said',
    phone_left: 'The friend left. She wrote to Olga:',
    phone_sasha_left: 'Sasha left. She wrote to Olga:',
    phone_msg_name: 'Friend', phone_friend_preview: 'Friend', phone_just_now: 'just now',
    phone_msg_text: '"Wait for a call"',
    phone_narrative: 'Stan wrote to Olga',
    phone_olga: 'Olga',
    chat_hi: 'Hello!', chat_hello: 'Good day.', chat_meet: "Let's get acquainted.",
    story_began: 'That is how this story began.',
    story_began_l1: 'That is how', story_began_l2: 'this story began.',
    four_label: 'My first 4 lines — to Stan',
    four_lines_word: 'lines',
    four_quote: 'I am a mirage...',
    four_sang: 'He sang them.', four_not_read: "Didn't read.", four_not_disc: "Didn't discuss.", four_sang_big: 'Sang.',
    word_title: 'The tap opened.',
    word_subtitle: 'Words began to flow — and every word became a song.',
    word_end: 'Words became songs. Songs became lives.',
    word_words: [
      'love', 'memory', 'war', 'loneliness', 'joy',
      'loss', 'hope', 'life', 'road', 'silence',
      'light', 'night', 'meeting', 'parting', 'time',
      'voice', 'word', 'heart', 'sky', 'home',
    ],
    songs_count: 'songs',
    songs_tagline: 'In seven languages. For thousands of people. From one call.',
    songs_listen_heading: 'Listen',
    songs_play: 'Play',
    songs_lyrono: 'Listen on Lyrono',
    langs_caption: 'Seven languages of one story',
    never_title: 'We never met.',
    never_reality: 'In real life.',
    never_text: 'But in this time we managed to see each other as even people living side by side sometimes cannot.',
    never_words: ['Sleepy.','Tired.','Irritated.','Sick.','Crying.','Laughing.'],
    never_final: 'Real.',
    distance_label: 'Distance',
    distance_line: 'Distance separates people. Music brings them together.',
    distance_author: 'author',
    distance_performer: 'performer',
    distance_path: 'line → note → song',
    valsok_caption: 'The story of one song',
    valsok_steps: ['Hall', 'Silence', 'Conductor', 'Young man', 'Young woman', 'Hands touching', 'Music'],
    valsok_final: 'Waltz',
    valsok_quote: '"Please stay a little longer."',
    valsok_after: 'But time will leave anyway.',
    seventy_label: 'people stopped at this song',
    seventy_line1: 'For some, this is just a number.',
    seventy_line2: 'For us — the first sign that songs can reach beyond our little world.',
    soul_quote1: '"You turned my soul inside out."',
    soul_quote2: '"I became your student forever."',
    soul_band: 'We are a good gang.',
    phil_title: 'Why do we write?',
    phil_line1: 'We write not only about ourselves.',
    phil_line2: 'We write about people.',
    phil_line3: 'About what happens to almost everyone:',
    phil_topics: ['about love,','about loss,','about hope,','about memory,','about meetings,','about parting,','about life.'],
    stories_title: 'Stories',
    stories_intro: 'Some songs do not begin with music.\nThey begin with a person.',
    finale_we_write: 'We write...',
    finale_question: 'What happens next?',
    finale_dont_know: "I don't know.",
    finale_pause: '— pause —',
    finale_nobody: 'And probably nobody knows.',
    finale_create: 'But while we are alive — we can create.',
    finale_line1: 'Life is wonderful.',
    finale_line2: 'You just have to know how to be amazed!',
    finale_continues: 'Our story continues.',
    footer_tagline: 'Made of stories, music and human feelings.',
    switch_lang: 'Language',
    menu_open: 'Open menu',
    menu_close: 'Close menu',
  },

  de: {
    nav_story: 'Geschichte', nav_songs: 'Lieder', nav_stories: 'Geschichten',
    nav_youtube: 'YouTube', nav_contacts: 'Kontakt',
    hero_eyebrow: 'Olga Ruban',
    hero_line1: 'Das Leben ist wunderbar.',
    hero_line2: 'Man muss nur staunen können!',
    hero_subtitle: 'Die Geschichte eines unerwarteten Anrufs, zweier Menschen und Hunderte von Liedern, die einst ihr eigenes Leben begannen.',
    hero_cta1: 'Unsere Geschichte', hero_cta2: 'Lieder hören',
    opening: 'Alles begann mit einem unerwarteten Anruf.',
    phone_intro: 'Eine Freundin war mit Stan in einem Videoanruf...',
    phone_incoming: 'Eingehender Videoanruf', phone_video: 'Videoanruf', phone_name: 'Stan',
    phone_decline: 'Ablehnen', phone_accept: 'Annehmen',
    phone_quote1: '„Mach das alles aus!“',
    phone_bg_label: 'Im Hintergrund — Olga',
    phone_stan_label: 'Stan hörte Olga und sagte',
    phone_left: 'Die Freundin ging. Sie schrieb Olga:',
    phone_sasha_left: 'Sascha ging. Sie schrieb Olga:',
    phone_msg_name: 'Freundin', phone_friend_preview: 'Freundin', phone_just_now: 'gerade eben',
    phone_msg_text: '„Wartet auf den Anruf“',
    phone_narrative: 'Stan schrieb Olga',
    phone_olga: 'Olga',
    chat_hi: 'Hallo!', chat_hello: 'Guten Tag.', chat_meet: 'Lass uns uns kennenlernen.',
    story_began: 'So begann diese Geschichte.',
    story_began_l1: 'So begann', story_began_l2: 'diese Geschichte.',
    four_label: 'Meine ersten 4 Zeilen — für Stan',
    four_lines_word: 'Zeilen',
    four_quote: 'Ich bin eine Fata Morgana...',
    four_sang: 'Er sang sie.', four_not_read: 'Nicht gelesen.', four_not_disc: 'Nicht besprochen.', four_sang_big: 'Gesungen.',
    word_title: 'Der Hahn öffnete sich.',
    word_subtitle: 'Die Worte begannen zu fließen — und jedes Wort wurde ein Lied.',
    word_end: 'Worte wurden Lieder. Lieder wurden Leben.',
    word_words: [
      'Liebe', 'Erinnerung', 'Krieg', 'Einsamkeit', 'Freude',
      'Verlust', 'Hoffnung', 'Leben', 'Weg', 'Stille',
      'Licht', 'Nacht', 'Begegnung', 'Abschied', 'Zeit',
      'Stimme', 'Wort', 'Herz', 'Himmel', 'Zuhause',
    ],
    songs_count: 'Lieder',
    songs_tagline: 'In sieben Sprachen. Für Tausende Menschen. Aus einem Anruf.',
    songs_listen_heading: 'Anhören',
    songs_play: 'Hören',
    songs_lyrono: 'Auf Lyrono anhören',
    langs_caption: 'Sieben Sprachen einer Geschichte',
    never_title: 'Wir haben uns nie getroffen.',
    never_reality: 'In der Realität.',
    never_text: 'Aber in dieser Zeit haben wir uns so gesehen, wie es manchmal nicht einmal Menschen tun, die nebeneinander leben.',
    never_words: ['Verschlafen.','Müde.','Gereizt.','Krank.','Weinend.','Lachend.'],
    never_final: 'Echt.',
    distance_label: 'Entfernung',
    distance_line: 'Entfernung trennt Menschen. Musik verbindet sie.',
    distance_author: 'Autorin',
    distance_performer: 'Interpret',
    distance_path: 'Zeile → Note → Lied',
    valsok_caption: 'Die Geschichte eines Liedes',
    valsok_steps: ['Saal', 'Stille', 'Dirigent', 'Jüngling', 'Mädchen', 'Berührung der Hände', 'Musik'],
    valsok_final: 'Walzer',
    valsok_quote: '„Bitte bleib noch.“',
    valsok_after: 'Aber die Zeit geht trotzdem.',
    seventy_label: 'Menschen blieben bei diesem Lied stehen',
    seventy_line1: 'Für manche ist das nur eine Zahl.',
    seventy_line2: 'Für uns — das erste Zeichen, dass Lieder über unsere kleine Welt hinausgehen können.',
    soul_quote1: '„Du hast meine Seele auf links gedreht.“',
    soul_quote2: '„Ich bin für immer dein Schüler geworden.“',
    soul_band: 'Wir sind eine gute Bande.',
    phil_title: 'Warum schreiben wir?',
    phil_line1: 'Wir schreiben nicht nur über uns selbst.',
    phil_line2: 'Wir schreiben über Menschen.',
    phil_line3: 'Über das, was fast jedem passiert:',
    phil_topics: ['über Liebe,','über Verlust,','über Hoffnung,','über Erinnerung,','über Begegnungen,','über Abschied,','über das Leben.'],
    stories_title: 'Geschichten',
    stories_intro: 'Manche Lieder beginnen nicht mit Musik.\nSie beginnen mit einem Menschen.',
    finale_we_write: 'Wir schreiben...',
    finale_question: 'Was kommt als nächstes?',
    finale_dont_know: 'Ich weiß es nicht.',
    finale_pause: '— Pause —',
    finale_nobody: 'Und wahrscheinlich weiß es niemand.',
    finale_create: 'Aber solange wir leben — können wir erschaffen.',
    finale_line1: 'Das Leben ist wunderbar.',
    finale_line2: 'Man muss nur staunen können!',
    finale_continues: 'Unsere Geschichte geht weiter.',
    footer_tagline: 'Gemacht aus Geschichten, Musik und menschlichen Gefühlen.',
    switch_lang: 'Sprache',
    menu_open: 'Menü öffnen',
    menu_close: 'Menü schließen',
  },
}

export const songI18n: Record<Exclude<Lang, 'ru'>, Record<number, { genre: string; story: string; language: string }>> = {
  en: {
    1: { language: 'Russian', genre: 'Waltz', story: 'A young man invites a young woman. Time stops. The music begins.' },
    2: { language: 'Russian', genre: 'Lyrical song about fate', story: 'The first word from which everything began.' },
    3: { language: 'Russian', genre: 'Cheerful chanson', story: 'When words in one language cannot hold it all.' },
    4: { language: 'Russian', genre: 'Lyrical chanson about love', story: 'A lyrical song about love, memory and an inner fire that does not go out, even when the past cannot be returned. A sincere male story, full of warmth, pain and the dignity of lived feeling.' },
    5: { language: 'Russian', genre: 'Lyrical chanson', story: 'A lyrical song about love, care and quiet human warmth. A story told simply and honestly — about feelings that live in details, in memory and in the heart.' },
    6: { language: 'Russian', genre: 'Song of feeling and time', story: 'A lyrical song about a time when feelings grow quieter, but deeper and more honest. A story of love that does not shout, but lives in pauses, glances and autumn silence.' },
    7: { language: 'Russian', genre: 'Romantic tango', story: 'Time. In any language it leaves the same way.' },
    8: { language: 'Russian', genre: 'Romantic ballad of love and eternity', story: 'A confession of love, spoken to the stars and to a woman whose presence makes the world brighter even in the dark. A story of moments when sky and heart become one, of happiness falling from heaven like a shower of stars.' },
    9: { language: 'Russian', genre: 'Fast dance hit', story: 'Not loneliness as misfortune. Loneliness as a state.' },
    10: { language: 'Russian', genre: 'Rosh Hashanah song', story: 'This song is dedicated to the Jewish New Year — Rosh Hashanah — a day when we light candles, gather with those we love, and wish goodness, health and peace to one another and to the world.' },
    11: { language: 'Russian', genre: 'Soulful ballad', story: 'Everyone has their own road. Sometimes they cross.' },
    12: { language: 'Russian', genre: 'Music', story: 'A song-prayer, filled with light and warmth. It is about asking protection for the people closest to us: on the road and in silence, in a crowd and in solitude, in love and in parting.' },
  },
  de: {
    1: { language: 'Russisch', genre: 'Walzer', story: 'Ein junger Mann lädt ein Mädchen ein. Die Zeit bleibt stehen. Die Musik beginnt.' },
    2: { language: 'Russisch', genre: 'Lyrisches Lied über das Schicksal', story: 'Das erste Wort, mit dem alles begann.' },
    3: { language: 'Russisch', genre: 'Fröhlicher Chanson', story: 'Wenn Worte in einer Sprache nicht alles fassen können.' },
    4: { language: 'Russisch', genre: 'Lyrischer Chanson über die Liebe', story: 'Ein lyrisches Lied über Liebe, Erinnerung und ein inneres Feuer, das nicht erlischt, auch wenn die Vergangenheit nicht zurückkehrt. Eine aufrichtige männliche Erzählung voller Wärme, Schmerz und Würde gelebter Gefühle.' },
    5: { language: 'Russisch', genre: 'Lyrischer Chanson', story: 'Ein lyrisches Lied über Liebe, Fürsorge und stille menschliche Wärme. Eine Geschichte, einfach und ehrlich erzählt — von Gefühlen, die in Details, in der Erinnerung und im Herzen leben.' },
    6: { language: 'Russisch', genre: 'Lied über Gefühl und Zeit', story: 'Ein lyrisches Lied über eine Zeit, in der Gefühle leiser, aber tiefer und ehrlicher werden. Eine Geschichte von Liebe, die nicht schreit, sondern in Pausen, Blicken und herbstlicher Stille lebt.' },
    7: { language: 'Russisch', genre: 'Romantisches Tango', story: 'Zeit. In jeder Sprache geht sie auf dieselbe Weise.' },
    8: { language: 'Russisch', genre: 'Romantische Ballade über Liebe und Ewigkeit', story: 'Ein Liebesbekenntnis an die Sterne und an eine Frau, deren Gegenwart die Welt selbst in der Dunkelheit heller macht. Eine Geschichte von Augenblicken, in denen Himmel und Herz eins werden, von Glück, das wie Sternenregen vom Himmel fällt.' },
    9: { language: 'Russisch', genre: 'Schneller Tanzhit', story: 'Nicht Einsamkeit als Unglück. Einsamkeit als Zustand.' },
    10: { language: 'Russisch', genre: 'Rosch-ha-Schana-Lied', story: 'Dieses Lied ist dem jüdischen Neujahr — Rosch ha-Schana — gewidmet: einem Tag, an dem wir Kerzen anzünden, uns mit den Nahestehenden versammeln und einander und der Welt Gutes, Gesundheit und Frieden wünschen.' },
    11: { language: 'Russisch', genre: 'Seelenvolle Ballade', story: 'Jeder hat seinen eigenen Weg. Manchmal kreuzen sie sich.' },
    12: { language: 'Russisch', genre: 'Musik', story: 'Ein Lied-Gebet voller Licht und Wärme. Es geht darum, Schutz für die nächsten Menschen zu erbitten: unterwegs und in der Stille, in der Menge und in der Einsamkeit, in der Liebe und in der Trennung.' },
  },
}

export const storyI18n: Record<Exclude<Lang, 'ru'>, Record<number, { title: string; subtitle: string; excerpt: string }>> = {
  en: {
    1: {
      title: 'Valsok',
      subtitle: 'The story of one song that was heard 70,000 times',
      excerpt: 'August 2025. Evening. I was sitting in the kitchen. My hand reached for a sheet of paper and I wrote “Everything around stood still...”',
    },
    2: {
      title: 'One of my stories',
      subtitle: '',
      excerpt: 'Sometimes a person can be beside you for only two days, then be gone for thirty years — and still remain the most important person in your life.',
    },
    3: {
      title: 'How hope was born from waiting',
      subtitle: '',
      excerpt: 'She had not arrived yet. But he already knew — they would meet.',
    },
  },
  de: {
    1: {
      title: 'Valsok',
      subtitle: 'Die Geschichte eines Liedes, das 70.000 Mal gehört wurde',
      excerpt: 'August 2025. Abend. Ich saß in der Küche. Die Hand griff nach einem Blatt Papier, und ich schrieb „Alles um uns herum blieb stehen...“',
    },
    2: {
      title: 'Eine meiner Geschichten',
      subtitle: '',
      excerpt: 'Manchmal kann ein Mensch nur zwei Tage neben dir sein und dann dreißig Jahre fehlen — und trotzdem der wichtigste Mensch deines Lebens bleiben.',
    },
    3: {
      title: 'Wie aus dem Warten Hoffnung wurde',
      subtitle: '',
      excerpt: 'Sie war noch nicht gekommen. Aber er wusste schon — sie würden sich treffen.',
    },
  },
}
