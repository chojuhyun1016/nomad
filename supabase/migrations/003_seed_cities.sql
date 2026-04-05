-- ============================================
-- Migration 003: 도시 시드 데이터 (12개)
-- ============================================

insert into cities (city_name, city_name_en, slug, image_url, k_nomad_score, monthly_cost, internet_speed, cafe_score, temperature, aqi, safety_score, ktx_to_seoul, region, environment, best_season, budget_range, likes, dislikes)
values
  ('제주', 'Jeju', 'jeju', '/images/cities/jeju.jpg', 82, 1200000, 45, 95, 22, 35, 88, '비행 1h', '제주도', '{자연친화,카페작업}', '{봄,가을}', '100~200만원', 892, 108),
  ('서울', 'Seoul', 'seoul', '/images/cities/seoul.jpg', 80, 1800000, 120, 98, 20, 55, 85, '—', '수도권', '{도심선호,카페작업,코워킹 필수}', '{봄,가을}', '100~200만원', 920, 80),
  ('부산', 'Busan', 'busan', '/images/cities/busan.jpg', 78, 1100000, 80, 88, 23, 40, 86, '2h 30m', '경상도', '{자연친화,카페작업}', '{여름,가을}', '100~200만원', 870, 130),
  ('강릉', 'Gangneung', 'gangneung', '/images/cities/gangneung.jpg', 75, 950000, 50, 85, 21, 30, 90, '1h 50m', '강원도', '{자연친화,카페작업}', '{여름,겨울}', '100만원 이하', 850, 150),
  ('전주', 'Jeonju', 'jeonju', '/images/cities/jeonju.jpg', 74, 900000, 60, 82, 21, 42, 91, '1h 40m', '전라도', '{도심선호,카페작업}', '{봄,가을}', '100만원 이하', 830, 170),
  ('대전', 'Daejeon', 'daejeon', '/images/cities/daejeon.jpg', 73, 1000000, 90, 78, 20, 48, 87, '50m', '충청도', '{도심선호,코워킹 필수}', '{봄,가을}', '100만원 이하', 780, 220),
  ('경주', 'Gyeongju', 'gyeongju', '/images/cities/gyeongju.jpg', 72, 850000, 45, 76, 22, 38, 92, '2h 10m', '경상도', '{자연친화}', '{봄,가을}', '100만원 이하', 810, 190),
  ('여수', 'Yeosu', 'yeosu', '/images/cities/yeosu.jpg', 71, 900000, 40, 74, 22, 32, 89, '2h 40m', '전라도', '{자연친화}', '{여름,가을}', '100만원 이하', 840, 160),
  ('춘천', 'Chuncheon', 'chuncheon', '/images/cities/chuncheon.jpg', 70, 880000, 55, 72, 19, 36, 90, '1h 10m', '강원도', '{자연친화}', '{봄,여름}', '100만원 이하', 790, 210),
  ('속초', 'Sokcho', 'sokcho', '/images/cities/sokcho.jpg', 69, 920000, 42, 70, 20, 28, 91, '2h 30m', '강원도', '{자연친화}', '{여름,겨울}', '100만원 이하', 820, 180),
  ('대구', 'Daegu', 'daegu', '/images/cities/daegu.jpg', 68, 1050000, 85, 80, 24, 52, 84, '1h 40m', '경상도', '{도심선호,코워킹 필수}', '{봄,가을}', '100~200만원', 760, 240),
  ('양양', 'Yangyang', 'yangyang', '/images/cities/yangyang.jpg', 67, 850000, 38, 68, 20, 25, 93, '2h 40m', '강원도', '{자연친화,카페작업}', '{여름,겨울}', '100만원 이하', 800, 200)
on conflict (slug) do nothing;
