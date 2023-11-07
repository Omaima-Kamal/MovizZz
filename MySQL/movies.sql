-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2023 at 06:41 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `name`, `description`, `image_url`) VALUES
(15, 'Black Adam', 'After being granted with the divine power of the Egyptian Gods and spending almost 5000 years in a guardhouse, Black Adam is freed and he decides to unloose his own style of justice to the world.', '1698838607791.jpg'),
(20, 'Frozen', 'now Queen Elsa inadvertently uses her power to make her kingdom experience constant wintriness. Her sister Anna teams up with mountaineer Kristoff and his reindeer to demolish the snowy spell.', '1698834559477.jpeg'),
(21, 'Frozen II', 'Three years after her coronation when Elsa celebrates Autumn, she hears a mysterious voice. She follows that voice along with Anna and their friends as they are forced to uncover the truth.', '1698838170524.jpg'),
(22, 'Hobbit: An Unexpected Journey', 'Bilbo Baggins, a hobbit, finds himself accompanying a group of dwarves and a wizard on their journey to reclaim the Kingdom of Erebor from the clutches of Smaug, an evil dragon.', '1698838622143.jpg'),
(23, 'The Hobbit: The Desolation of Smaug', 'Bilbo Baggins, a hobbit, and his companions face great dangers on their journey to Laketown. Soon, they reach the Lonely Mountain, where Bilbo comes face-to-face with the fearsome dragon Smaug.', '1698838192872.jpg'),
(24, 'The Hobbit: The Battle of the Five Armies', 'Bilbo, a hobbit, makes desperate attempts to save Thorin from the clutches of acquisitiveness while Sauron plans an elaborate attack on Middle Earth to obliterate the humans, dwarves and elves', '1698838203907.jpg'),
(25, 'Transformers: Revenge of the Fallen', 'Sam wants to lead a normal life in college but he has visions of Cybertronion symbols. Meanwhile, an ancient threat marshals the rest of the Decepticons in order to avenge their earlier defeat.', '1698838016790.jpg'),
(26, 'Transformers: Dark of the Moon                     ', '\r\nThe Autobots embark on a mission to reach a Cybertronian spacecraft that crash-landed on the moon and learn its secrets before the evil Decepticons get a chance to misuse it.', '1698837933013.jpg'),
(27, 'IT', 'Seven helpless and bullied children are forced to face their worst nightmares when Pennywise, a shape-shifting clown, reappears. The clown, an ancient evil torments children before feeding on them.', '1698860620020.jpg'),
(28, 'Up', 'Carl, an old widower, goes off on an adventure with the help of Russell, a boy scout, in his flying house to search for Paradise Falls, his wife\'s dream destination.', '1698860681390.jpg'),
(29, 'The Avengers', 'S.H.I.E.L.D. leader Nick Fury is compelled to launch the Avengers programme when Loki poses a threat to planet Earth. But the superheroes must learn to work together if they are to stop him in time.', '1698860941892.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `movie_review`
--

CREATE TABLE `movie_review` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_review`
--

INSERT INTO `movie_review` (`id`, `user_id`, `movie_id`, `review`) VALUES
(6, 7, 15, 'Greet Movie !!!'),
(7, 7, 15, 'hi');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> normal user\r\n1 -> admin user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`, `role`) VALUES
(2, 'ahmed Mohammed', 'ahmedmohammed@gmail.com', '$2b$10$qIghuOoEHuXTuliMYMexD.yBPYxfswaFzDfWr11S8A66gPNkRxTS6', '572507f99a5a67c050ea5ced73a6091c', 0),
(3, 'ahmed Mohammed', 'ahmedmohammed@gmail.com', '$2b$10$ot.FVoLvQVYEHN89yOi/ZOCVPxz8kpyCfZgZoPJ0U.JLK0KB2vB.S', '1967d4167c1b0b0d579142d01017726c', 0),
(4, 'Mohammed Ali', 'mohammed@gmail.com', '$2b$10$ni9mVjv/W8.g2EHi9z8iNObkdWO.7DmHtdWe3pVOUJ.aTgWnqRuiu', 'b742a177bd48c2232d76bdb40f191276', 0),
(5, 'admin admin', 'admin@admin.com', '$2b$10$ApOup1Fop7BPr2/ZA7vzs.p4TX0Z0b6kM7KtZgu6wE4vJxwHE83TO', '86766381c95f5c7ea52bf21bca0fe888', 0),
(6, 'Mona Ahmed', 'mona12ahmed@gmail.com', '$2b$10$FRAbSys.VuUaSAv9MlgiTeAat6cyg8V0GF/JuMOrzPob75OlzUcQy', 'bec4d937d0c35e1cb30c34287a855ad3', 0),
(7, 'Dina Mohammed', 'dina@gmail.com', '$2b$10$G.YFcO1ooxAxUmkvF/EVIeXuRwBC7z2WbbWzuug8r178V6ac8.24m', 'b86495d2dace8575d70185b8a630b839', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_review`
--
ALTER TABLE `movie_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_constr_id` (`user_id`),
  ADD KEY `movie_constr_id` (`movie_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `movie_review`
--
ALTER TABLE `movie_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_review`
--
ALTER TABLE `movie_review`
  ADD CONSTRAINT `movie_constr_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_constr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
