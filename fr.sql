-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 08 2019 г., 02:12
-- Версия сервера: 5.6.41
-- Версия PHP: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `fr`
--

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `date` text NOT NULL,
  `prefix` text NOT NULL,
  `mini` text NOT NULL,
  `category` text NOT NULL,
  `rubriky` text NOT NULL,
  `cat_info` text NOT NULL,
  `cat_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `title`, `text`, `date`, `prefix`, `mini`, `category`, `rubriky`, `cat_info`, `cat_name`) VALUES
(1, 'Чето в заголовке о php', 'Основная статья\r\n:cods:php||<?\r\n# (c) Арсеньев Алексей(php-jiexa@mail.ru) & Vyrus\r\n# $host - Удаленный хост\r\n# $port - Порт на удалённом хосте\r\n# $path - Путь до страницы, которая принимает файл\r\n# $filePath - Путь до файла, который отсылаем\r\n# $fileField - Имя поля file на удаленном хосте\r\n# $fields - Дополнительные поля. Пример array(\"email\" => \"php-jiexa@mail.ru\");\r\n\r\nfunction sendFile($host, $port=\"80\", $path, $filePath, $fileName, $fileField, $fields = array())\r\n{\r\n  define(\"CRLF\", \"\\r\\n\");\r\n  define(\"DCRLF\", CRLF.CRLF);\r\n\r\n  $boundary = \"---------------------\".substr(md5(rand(0,32000)),0,10);\r\n\r\n  $fieldsData = \"\";\r\n\r\n  if(count($fields) > \"0\"):\r\n  foreach($fields as $field => $value)\r\n  {\r\n    $fieldsData .=  \"--\".$boundary.CRLF;\r\n    $fieldsData .=  \"Content-Disposition: form-data; name=\\\"\".$field.\"\\\"\".DCRLF;\r\n    $fieldsData .=  urlencode($value).CRLF;\r\n  }\r\n  endif;\r\n\r\n  $fileHeaders = \"--\".$boundary.CRLF;\r\n  $fileHeaders .= \"Content-Disposition: form-data; name=\\\"\".$fileField.\"\\\"; filename=\\\"\".$fileName.\"\\\"\".CRLF;\r\n  $fileHeaders .= \"Content-Type: \".mime_content_type($filePath).DCRLF;\r\n  $fileHeadersTail = CRLF.\"--\".$boundary.\"--\".CRLF;\r\n\r\n  $filesize = filesize($filePath);\r\n  $contentLength = strlen($fieldsData) + strlen($fileHeaders) + $filesize + strlen($fileHeadersTail);\r\n\r\n  $headers  = \"POST $path HTTP/1.0\".CRLF;\r\n  $headers .= \"Host: \".$host.CRLF;\r\n  $headers .= \"Referer: \".$host.CRLF;\r\n  $headers .= \"Content-type: multipart/form-data, boundary=\".$boundary.CRLF;\r\n  $headers .= \"Content-length: \".$contentLength.DCRLF;\r\n  $headers .= $fieldsData;\r\n  $headers .= $fileHeaders;\r\n\r\n  if(!$fp = fsockopen($host, $port)) return false;\r\n  fputs($fp, $headers);\r\n\r\n  $fp2 = fopen($filePath, \"rb\");\r\n\r\n  while(!feof($fp2)) fputs($fp, fgets($fp2, 1024*100));\r\n\r\n  fclose($fp2);\r\n\r\n  fputs($fp, $fileHeadersTail);\r\n\r\n  $serverResponse = \"\";\r\n  while(!feof($fp)) $serverResponse .= fgets($fp, 4096);\r\n  fclose($fp);\r\n\r\n  return $serverResponse;\r\n}\r\n?>:/cods:', '12.12.2012', 'Здесь основной текст когда не открыта статья', 'no', 'php', '1', 'PHP:', ' Hypertext Preprocessor'),
(2, 'Заголовок', 'Текст', '24.03.2017', 'Описание', 'no', 'java', '1', 'J', 'ava'),
(3, 'dfgdfgdf', 'gdfgdfgdf', '543534534', 'gdfgdfg', 'no', 'java', '1', 'j', 'ava'),
(4, 'gtreter', 'ertert', 'ertrte', 'erterter', 'no', 'java', '1', 'j', 'ava'),
(5, 'gdfgdfg', 'dfgdfgdfg', 'dfgdfgdfg', 'dfgdfgdf', 'no', 'java', '1', 'j', 'ava'),
(6, 'etyrtyrtyrtfh', 'hfghfghfgh', 'fghfghfg', 'fgfgghfghf', 'no', 'java', '1', 'j', 'ava');

-- --------------------------------------------------------

--
-- Структура таблицы `filed_under`
--

CREATE TABLE `filed_under` (
  `id` int(11) NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filed_under`
--

INSERT INTO `filed_under` (`id`, `link`) VALUES
(1, 'PHP');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `aname` text NOT NULL,
  `fname` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `login` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `aname`, `fname`, `phone`, `email`, `login`, `pass`) VALUES
(1, 'Сергей', 'Касаткин', '+79108894380', 'freetensez@gmail.com', 'freetense', '96e79218965eb72c92a549dd5a330112');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filed_under`
--
ALTER TABLE `filed_under`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `filed_under`
--
ALTER TABLE `filed_under`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
