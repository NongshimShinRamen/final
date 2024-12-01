const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'shop'
});

// 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 (CSS, JS 등) 설정
app.use(express.static(path.join(__dirname, 'public')));

// Body parser 설정 (폼 데이터 처리)
app.use(express.urlencoded({ extended: true }));

// 홈 페이지 - 게시판 글 목록 조회
app.get('/', (req, res) => {
  const query = 'SELECT * FROM Posts ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { posts: results });
  });
});

// 게시글 작성 페이지
app.get('/create', (req, res) => {
  res.render('create');
});

// 게시글 저장
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO Posts (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});







const express = require('express');
const path = require('path');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 기본 라우트
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
