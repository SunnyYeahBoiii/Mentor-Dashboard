import { runningSectionInfoDto, sectionCreateDto, sectionInfoDto } from "@/dtos/section.dto";

// Mock data for Mentor Dashboard (Vietnamese Localized)
export const students = [
  {
    "id": "std-001",
    "province": "Đà Nẵng",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2006,
    "lastName": "Lê",
    "firstName": "Yến",
    "middleName": "Đình"
  },
  {
    "id": "std-002",
    "province": "TP. Hồ Chí Minh",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2007,
    "lastName": "Hồ",
    "firstName": "Chí",
    "middleName": "Công"
  },
  {
    "id": "std-003",
    "province": "Hải Phòng",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2007,
    "lastName": "Nguyễn",
    "firstName": "Anh",
    "middleName": "Công"
  },
  {
    "id": "std-004",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2006,
    "lastName": "Đỗ",
    "firstName": "Minh",
    "middleName": "Thị"
  },
  {
    "id": "std-005",
    "province": "Thừa Thiên Huế",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2006,
    "lastName": "Hoàng",
    "firstName": "Minh",
    "middleName": "Đình"
  },
  {
    "id": "std-006",
    "province": "TP. Hồ Chí Minh",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2007,
    "lastName": "Hoàng",
    "firstName": "Chí",
    "middleName": "Công"
  },
  {
    "id": "std-007",
    "province": "Khánh Hòa",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2008,
    "lastName": "Lê",
    "firstName": "Chí",
    "middleName": "Anh"
  },
  {
    "id": "std-008",
    "province": "Đà Nẵng",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2007,
    "lastName": "Hoàng",
    "firstName": "Nam",
    "middleName": "Minh"
  },
  {
    "id": "std-009",
    "province": "Hải Phòng",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2006,
    "lastName": "Đặng",
    "firstName": "Linh",
    "middleName": "Thành"
  },
  {
    "id": "std-010",
    "province": "TP. Hồ Chí Minh",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2009,
    "lastName": "Lý",
    "firstName": "Sơn",
    "middleName": "Văn"
  },
  {
    "id": "std-011",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2010,
    "lastName": "Đỗ",
    "firstName": "Giang",
    "middleName": "Thành"
  },
  {
    "id": "std-012",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2008,
    "lastName": "Vũ",
    "firstName": "Xuân",
    "middleName": "Quang"
  },
  {
    "id": "std-013",
    "province": "Hải Phòng",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2007,
    "lastName": "Phạm",
    "firstName": "Tùng",
    "middleName": "Minh"
  },
  {
    "id": "std-014",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2007,
    "lastName": "Phạm",
    "firstName": "Chí",
    "middleName": "Văn"
  },
  {
    "id": "std-015",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2008,
    "lastName": "Lê",
    "firstName": "Oanh",
    "middleName": "Anh"
  },
  {
    "id": "std-016",
    "province": "Bình Dương",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2009,
    "lastName": "Vũ",
    "firstName": "Sơn",
    "middleName": "Thành"
  },
  {
    "id": "std-017",
    "province": "Hải Phòng",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2006,
    "lastName": "Lê",
    "firstName": "Hùng",
    "middleName": "Minh"
  },
  {
    "id": "std-018",
    "province": "Thừa Thiên Huế",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2006,
    "lastName": "Phan",
    "firstName": "Minh",
    "middleName": "Quang"
  },
  {
    "id": "std-019",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2009,
    "lastName": "Nguyễn",
    "firstName": "Phạm",
    "middleName": "Văn"
  },
  {
    "id": "std-020",
    "province": "TP. Hồ Chí Minh",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2010,
    "lastName": "Trần",
    "firstName": "Quang",
    "middleName": "Quang"
  },
  {
    "id": "std-021",
    "province": "Đồng Nai",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2009,
    "lastName": "Lê",
    "firstName": "Bình",
    "middleName": "Hữu"
  },
  {
    "id": "std-022",
    "province": "Hải Phòng",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2009,
    "lastName": "Hoàng",
    "firstName": "Linh",
    "middleName": "Đình"
  },
  {
    "id": "std-023",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2008,
    "lastName": "Vũ",
    "firstName": "Anh",
    "middleName": "Đức"
  },
  {
    "id": "std-024",
    "province": "Đà Nẵng",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2008,
    "lastName": "Đỗ",
    "firstName": "Chí",
    "middleName": "Quang"
  },
  {
    "id": "std-025",
    "province": "Đồng Nai",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2009,
    "lastName": "Lý",
    "firstName": "Minh",
    "middleName": "Thành"
  },
  {
    "id": "std-026",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2008,
    "lastName": "Hồ",
    "firstName": "Phạm",
    "middleName": "Minh"
  },
  {
    "id": "std-027",
    "province": "Bình Dương",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2007,
    "lastName": "Đặng",
    "firstName": "Vinh",
    "middleName": "Thành"
  },
  {
    "id": "std-028",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2006,
    "lastName": "Vũ",
    "firstName": "Linh",
    "middleName": "Đình"
  },
  {
    "id": "std-029",
    "province": "Khánh Hòa",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2009,
    "lastName": "Ngô",
    "firstName": "Vinh",
    "middleName": "Hữu"
  },
  {
    "id": "std-030",
    "province": "Thừa Thiên Huế",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2010,
    "lastName": "Lê",
    "firstName": "Quang",
    "middleName": "Đức"
  },
  {
    "id": "std-031",
    "province": "Đồng Nai",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2009,
    "lastName": "Trần",
    "firstName": "Dũng",
    "middleName": "Đức"
  },
  {
    "id": "std-032",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2007,
    "lastName": "Vũ",
    "firstName": "Anh",
    "middleName": "Văn"
  },
  {
    "id": "std-033",
    "province": "Đồng Nai",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2006,
    "lastName": "Đỗ",
    "firstName": "Bình",
    "middleName": "Quang"
  },
  {
    "id": "std-034",
    "province": "Đà Nẵng",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2006,
    "lastName": "Phạm",
    "firstName": "Giang",
    "middleName": "Văn"
  },
  {
    "id": "std-035",
    "province": "Hải Phòng",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2006,
    "lastName": "Phạm",
    "firstName": "Chí",
    "middleName": "Đình"
  },
  {
    "id": "std-036",
    "province": "Cần Thơ",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2009,
    "lastName": "Nguyễn",
    "firstName": "Phạm",
    "middleName": "Văn"
  },
  {
    "id": "std-037",
    "province": "Khánh Hòa",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2008,
    "lastName": "Hoàng",
    "firstName": "Giang",
    "middleName": "Đình"
  },
  {
    "id": "std-038",
    "province": "Đà Nẵng",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2006,
    "lastName": "Hoàng",
    "firstName": "Phạm",
    "middleName": "Công"
  },
  {
    "id": "std-039",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2008,
    "lastName": "Ngô",
    "firstName": "Vinh",
    "middleName": "Thị"
  },
  {
    "id": "std-040",
    "province": "Bình Dương",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2008,
    "lastName": "Ngô",
    "firstName": "Chí",
    "middleName": "Đình"
  },
  {
    "id": "std-041",
    "province": "Hải Phòng",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2006,
    "lastName": "Đỗ",
    "firstName": "Sơn",
    "middleName": "Công"
  },
  {
    "id": "std-042",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2008,
    "lastName": "Đỗ",
    "firstName": "Vinh",
    "middleName": "Anh"
  },
  {
    "id": "std-043",
    "province": "Bình Dương",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2009,
    "lastName": "Nguyễn",
    "firstName": "Quang",
    "middleName": "Anh"
  },
  {
    "id": "std-044",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2009,
    "lastName": "Vũ",
    "firstName": "Quang",
    "middleName": "Thị"
  },
  {
    "id": "std-045",
    "province": "Đồng Nai",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2006,
    "lastName": "Lý",
    "firstName": "Hùng",
    "middleName": "Minh"
  },
  {
    "id": "std-046",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2006,
    "lastName": "Hồ",
    "firstName": "Xuân",
    "middleName": "Văn"
  },
  {
    "id": "std-047",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2010,
    "lastName": "Vũ",
    "firstName": "Bình",
    "middleName": "Hữu"
  },
  {
    "id": "std-048",
    "province": "Hà Nội",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2007,
    "lastName": "Trần",
    "firstName": "Khánh",
    "middleName": "Đình"
  },
  {
    "id": "std-049",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Lê Hồng Phong",
    "birthyear": 2008,
    "lastName": "Vũ",
    "firstName": "Bình",
    "middleName": "Công"
  },
  {
    "id": "std-050",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2006,
    "lastName": "Đỗ",
    "firstName": "Yến",
    "middleName": "Văn"
  },
  {
    "id": "std-051",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2009,
    "lastName": "Dương",
    "firstName": "Quang",
    "middleName": "Đình"
  },
  {
    "id": "std-052",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2009,
    "lastName": "Dương",
    "firstName": "Anh",
    "middleName": "Thị"
  },
  {
    "id": "std-053",
    "province": "Hải Phòng",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2010,
    "lastName": "Hoàng",
    "firstName": "Tùng",
    "middleName": "Công"
  },
  {
    "id": "std-054",
    "province": "Cần Thơ",
    "school": "Trường THPT Chu Văn An",
    "birthyear": 2006,
    "lastName": "Lý",
    "firstName": "Linh",
    "middleName": "Đức"
  },
  {
    "id": "std-055",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Nguyễn Huệ",
    "birthyear": 2008,
    "lastName": "Dương",
    "firstName": "Minh",
    "middleName": "Đình"
  },
  {
    "id": "std-056",
    "province": "Bình Dương",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2008,
    "lastName": "Hồ",
    "firstName": "Dũng",
    "middleName": "Văn"
  },
  {
    "id": "std-057",
    "province": "Quảng Ninh",
    "school": "Trường THPT Chuyên Trần Phú",
    "birthyear": 2008,
    "lastName": "Ngô",
    "firstName": "Hùng",
    "middleName": "Thành"
  },
  {
    "id": "std-058",
    "province": "Cần Thơ",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2009,
    "lastName": "Đặng",
    "firstName": "Minh",
    "middleName": "Anh"
  },
  {
    "id": "std-059",
    "province": "Thừa Thiên Huế",
    "school": "Trường THPT Chuyên Phan Bội Châu",
    "birthyear": 2010,
    "lastName": "Vũ",
    "firstName": "Em",
    "middleName": "Thành"
  },
  {
    "id": "std-060",
    "province": "Hà Nội",
    "school": "Trường THPT Chuyên Hà Nội - Amsterdam",
    "birthyear": 2008,
    "lastName": "Nguyễn",
    "firstName": "Minh",
    "middleName": "Hữu"
  }
];

export const classes = [
  {
    "id": "cls-001",
    "section_fee": 340997,
    "section_count": 20,
    "name": "Lớp Lý - 1",
    "students_count": 20
  },
  {
    "id": "cls-002",
    "section_fee": 164402,
    "section_count": 10,
    "name": "Lớp Văn - 2",
    "students_count": 23
  },
  {
    "id": "cls-003",
    "section_fee": 385488,
    "section_count": 14,
    "name": "Lớp Tin học - 3",
    "students_count": 18
  },
  {
    "id": "cls-004",
    "section_fee": 181061,
    "section_count": 10,
    "name": "Lớp Lý - 4",
    "students_count": 23
  },
  {
    "id": "cls-005",
    "section_fee": 395678,
    "section_count": 18,
    "name": "Lớp Lý - 5",
    "students_count": 32
  },
  {
    "id": "cls-006",
    "section_fee": 330014,
    "section_count": 13,
    "name": "Lớp Văn - 6",
    "students_count": 34
  },
  {
    "id": "cls-007",
    "section_fee": 125986,
    "section_count": 15,
    "name": "Lớp Hóa - 7",
    "students_count": 24
  },
  {
    "id": "cls-008",
    "section_fee": 181747,
    "section_count": 11,
    "name": "Lớp Văn - 8",
    "students_count": 24
  },
  {
    "id": "cls-009",
    "section_fee": 440353,
    "section_count": 17,
    "name": "Lớp Toán - 9",
    "students_count": 41
  },
  {
    "id": "cls-010",
    "section_fee": 288141,
    "section_count": 18,
    "name": "Lớp Tin học - 10",
    "students_count": 27
  },
  {
    "id": "cls-011",
    "section_fee": 391566,
    "section_count": 14,
    "name": "Lớp Văn - 11",
    "students_count": 25
  },
  {
    "id": "cls-012",
    "section_fee": 320839,
    "section_count": 17,
    "name": "Lớp Toán - 12",
    "students_count": 41
  },
  {
    "id": "cls-013",
    "section_fee": 199321,
    "section_count": 17,
    "name": "Lớp Hóa - 13",
    "students_count": 26
  },
  {
    "id": "cls-014",
    "section_fee": 304897,
    "section_count": 16,
    "name": "Lớp Văn - 14",
    "students_count": 24
  },
  {
    "id": "cls-015",
    "section_fee": 134244,
    "section_count": 14,
    "name": "Lớp Anh - 15",
    "students_count": 43
  },
  {
    "id": "cls-016",
    "section_fee": 215636,
    "section_count": 15,
    "name": "Lớp Tin học - 16",
    "students_count": 43
  },
  {
    "id": "cls-017",
    "section_fee": 465837,
    "section_count": 16,
    "name": "Lớp Anh - 17",
    "students_count": 35
  },
  {
    "id": "cls-018",
    "section_fee": 315690,
    "section_count": 15,
    "name": "Lớp Văn - 18",
    "students_count": 29
  },
  {
    "id": "cls-019",
    "section_fee": 133174,
    "section_count": 20,
    "name": "Lớp Sinh - 19",
    "students_count": 34
  },
  {
    "id": "cls-020",
    "section_fee": 356116,
    "section_count": 15,
    "name": "Lớp Hóa - 20",
    "students_count": 40
  },
  {
    "id": "cls-021",
    "section_fee": 185491,
    "section_count": 18,
    "name": "Lớp Sinh - 21",
    "students_count": 30
  },
  {
    "id": "cls-022",
    "section_fee": 277583,
    "section_count": 15,
    "name": "Lớp Tin học - 22",
    "students_count": 36
  },
  {
    "id": "cls-023",
    "section_fee": 200482,
    "section_count": 11,
    "name": "Lớp Văn - 23",
    "students_count": 39
  },
  {
    "id": "cls-024",
    "section_fee": 491651,
    "section_count": 15,
    "name": "Lớp Anh - 24",
    "students_count": 29
  },
  {
    "id": "cls-025",
    "section_fee": 349332,
    "section_count": 16,
    "name": "Lớp Tin học - 25",
    "students_count": 24
  },
  {
    "id": "cls-026",
    "section_fee": 224502,
    "section_count": 16,
    "name": "Lớp Sinh - 26",
    "students_count": 23
  },
  {
    "id": "cls-027",
    "section_fee": 439336,
    "section_count": 11,
    "name": "Lớp Hóa - 27",
    "students_count": 25
  },
  {
    "id": "cls-028",
    "section_fee": 228257,
    "section_count": 20,
    "name": "Lớp Toán - 28",
    "students_count": 33
  },
  {
    "id": "cls-029",
    "section_fee": 369401,
    "section_count": 14,
    "name": "Lớp Lý - 29",
    "students_count": 20
  },
  {
    "id": "cls-030",
    "section_fee": 169611,
    "section_count": 20,
    "name": "Lớp Anh - 30",
    "students_count": 42
  },
  {
    "id": "cls-031",
    "section_fee": 291910,
    "section_count": 15,
    "name": "Lớp Toán - 31",
    "students_count": 39
  },
  {
    "id": "cls-032",
    "section_fee": 272134,
    "section_count": 12,
    "name": "Lớp Văn - 32",
    "students_count": 29
  },
  {
    "id": "cls-033",
    "section_fee": 498084,
    "section_count": 11,
    "name": "Lớp Lý - 33",
    "students_count": 24
  },
  {
    "id": "cls-034",
    "section_fee": 212869,
    "section_count": 16,
    "name": "Lớp Hóa - 34",
    "students_count": 24
  },
  {
    "id": "cls-035",
    "section_fee": 476194,
    "section_count": 13,
    "name": "Lớp Toán - 35",
    "students_count": 27
  },
  {
    "id": "cls-036",
    "section_fee": 464704,
    "section_count": 17,
    "name": "Lớp Tin học - 36",
    "students_count": 32
  },
  {
    "id": "cls-037",
    "section_fee": 405199,
    "section_count": 20,
    "name": "Lớp Anh - 37",
    "students_count": 39
  },
  {
    "id": "cls-038",
    "section_fee": 169445,
    "section_count": 16,
    "name": "Lớp Hóa - 38",
    "students_count": 30
  },
  {
    "id": "cls-039",
    "section_fee": 441388,
    "section_count": 18,
    "name": "Lớp Tin học - 39",
    "students_count": 19
  },
  {
    "id": "cls-040",
    "section_fee": 156669,
    "section_count": 11,
    "name": "Lớp Tin học - 40",
    "students_count": 45
  },
  {
    "id": "cls-041",
    "section_fee": 290374,
    "section_count": 18,
    "name": "Lớp Sinh - 41",
    "students_count": 19
  },
  {
    "id": "cls-042",
    "section_fee": 106001,
    "section_count": 15,
    "name": "Lớp Hóa - 42",
    "students_count": 32
  },
  {
    "id": "cls-043",
    "section_fee": 266328,
    "section_count": 13,
    "name": "Lớp Sinh - 43",
    "students_count": 25
  },
  {
    "id": "cls-044",
    "section_fee": 361948,
    "section_count": 20,
    "name": "Lớp Anh - 44",
    "students_count": 45
  },
  {
    "id": "cls-045",
    "section_fee": 466167,
    "section_count": 19,
    "name": "Lớp Sinh - 45",
    "students_count": 26
  },
  {
    "id": "cls-046",
    "section_fee": 124599,
    "section_count": 18,
    "name": "Lớp Anh - 46",
    "students_count": 39
  },
  {
    "id": "cls-047",
    "section_fee": 329439,
    "section_count": 14,
    "name": "Lớp Lý - 47",
    "students_count": 42
  },
  {
    "id": "cls-048",
    "section_fee": 145174,
    "section_count": 13,
    "name": "Lớp Sinh - 48",
    "students_count": 38
  },
  {
    "id": "cls-049",
    "section_fee": 281390,
    "section_count": 13,
    "name": "Lớp Tin học - 49",
    "students_count": 26
  },
  {
    "id": "cls-050",
    "section_fee": 374045,
    "section_count": 18,
    "name": "Lớp Anh - 50",
    "students_count": 28
  },
  {
    "id": "cls-051",
    "section_fee": 345212,
    "section_count": 20,
    "name": "Lớp Lý - 51",
    "students_count": 22
  },
  {
    "id": "cls-052",
    "section_fee": 107170,
    "section_count": 17,
    "name": "Lớp Anh - 52",
    "students_count": 18
  },
  {
    "id": "cls-053",
    "section_fee": 335299,
    "section_count": 16,
    "name": "Lớp Tin học - 53",
    "students_count": 30
  },
  {
    "id": "cls-054",
    "section_fee": 382829,
    "section_count": 17,
    "name": "Lớp Tin học - 54",
    "students_count": 39
  },
  {
    "id": "cls-055",
    "section_fee": 149741,
    "section_count": 14,
    "name": "Lớp Toán - 55",
    "students_count": 33
  }
];

export const runningSessions: runningSectionInfoDto[] = [
  { "id": "sec-001", "classId": "cls-001", "name": "Buổi học 1", "startTime": new Date("2024-02-21T08:00:00.000Z"), "meetingLink": "https://meet.google.com/qbf-jpsp-kqn" },
  { "id": "sec-058", "classId": "cls-008", "name": "Buổi học 3", "startTime": new Date("2024-02-25T13:30:00.000Z"), "meetingLink": "https://meet.google.com/qbf-jpsp-kqn" },
  { "id": "sec-059", "classId": "cls-009", "name": "Buổi học 3", "startTime": new Date("2024-02-26T15:00:00.000Z"), "meetingLink": "https://meet.google.com/qbf-jpsp-kqn" },
  { "id": "sec-060", "classId": "cls-010", "name": "Buổi học 3", "startTime": new Date("2024-02-25T15:00:00.000Z"), "meetingLink": "https://meet.google.com/qbf-jpsp-kqn" },
]

export const sessions: sectionInfoDto[] = [
  { "id": "sec-005", "classId": "cls-003", "name": "Buổi học 1", "startTime": new Date("2024-02-22T13:00:00.000Z"), "endTime": new Date("2024-02-22T15:00:00.000Z") },
  { "id": "sec-006", "classId": "cls-003", "name": "Buổi học 2", "startTime": new Date("2024-02-24T13:00:00.000Z"), "endTime": new Date("2024-02-24T15:00:00.000Z") },
  { "id": "sec-007", "classId": "cls-004", "name": "Buổi học 1", "startTime": new Date("2024-02-21T14:00:00.000Z"), "endTime": new Date("2024-02-21T16:00:00.000Z") },
  { "id": "sec-008", "classId": "cls-004", "name": "Buổi học 2", "startTime": new Date("2024-02-23T14:00:00.000Z"), "endTime": new Date("2024-02-23T16:00:00.000Z") },
  { "id": "sec-009", "classId": "cls-005", "name": "Buổi học 1", "startTime": new Date("2024-02-22T08:00:00.000Z"), "endTime": new Date("2024-02-22T10:00:00.000Z") },
  { "id": "sec-010", "classId": "cls-005", "name": "Buổi học 2", "startTime": new Date("2024-02-24T08:00:00.000Z"), "endTime": new Date("2024-02-24T10:00:00.000Z") },
  { "id": "sec-011", "classId": "cls-006", "name": "Buổi học 1", "startTime": new Date("2024-02-21T09:00:00.000Z"), "endTime": new Date("2024-02-21T11:00:00.000Z") },
  { "id": "sec-012", "classId": "cls-006", "name": "Buổi học 2", "startTime": new Date("2024-02-23T09:00:00.000Z"), "endTime": new Date("2024-02-23T11:00:00.000Z") },
  { "id": "sec-013", "classId": "cls-007", "name": "Buổi học 1", "startTime": new Date("2024-02-22T10:00:00.000Z"), "endTime": new Date("2024-02-22T12:00:00.000Z") },
  { "id": "sec-014", "classId": "cls-007", "name": "Buổi học 2", "startTime": new Date("2024-02-24T10:00:00.000Z"), "endTime": new Date("2024-02-24T12:00:00.000Z") },
  { "id": "sec-015", "classId": "cls-008", "name": "Buổi học 1", "startTime": new Date("2024-02-21T13:30:00.000Z"), "endTime": new Date("2024-02-21T15:30:00.000Z") },
  { "id": "sec-016", "classId": "cls-008", "name": "Buổi học 2", "startTime": new Date("2024-02-23T13:30:00.000Z"), "endTime": new Date("2024-02-23T15:30:00.000Z") },
  { "id": "sec-017", "classId": "cls-009", "name": "Buổi học 1", "startTime": new Date("2024-02-22T15:00:00.000Z"), "endTime": new Date("2024-02-22T17:00:00.000Z") },
  { "id": "sec-018", "classId": "cls-009", "name": "Buổi học 2", "startTime": new Date("2024-02-24T15:00:00.000Z"), "endTime": new Date("2024-02-24T17:00:00.000Z") },
  { "id": "sec-019", "classId": "cls-010", "name": "Buổi học 1", "startTime": new Date("2024-02-21T15:00:00.000Z"), "endTime": new Date("2024-02-21T17:00:00.000Z") },
  { "id": "sec-020", "classId": "cls-010", "name": "Buổi học 2", "startTime": new Date("2024-02-23T15:00:00.000Z"), "endTime": new Date("2024-02-23T17:00:00.000Z") },
  { "id": "sec-021", "classId": "cls-011", "name": "Buổi học 1", "startTime": new Date("2024-02-21T08:00:00.000Z"), "endTime": new Date("2024-02-21T10:00:00.000Z") },
  { "id": "sec-022", "classId": "cls-011", "name": "Buổi học 2", "startTime": new Date("2024-02-23T08:00:00.000Z"), "endTime": new Date("2024-02-23T10:00:00.000Z") },
  { "id": "sec-023", "classId": "cls-012", "name": "Buổi học 1", "startTime": new Date("2024-02-22T08:00:00.000Z"), "endTime": new Date("2024-02-22T10:00:00.000Z") },
  { "id": "sec-024", "classId": "cls-012", "name": "Buổi học 2", "startTime": new Date("2024-02-24T08:00:00.000Z"), "endTime": new Date("2024-02-24T10:00:00.000Z") },
  { "id": "sec-025", "classId": "cls-013", "name": "Buổi học 1", "startTime": new Date("2024-02-21T10:00:00.000Z"), "endTime": new Date("2024-02-21T12:00:00.000Z") },
  { "id": "sec-026", "classId": "cls-013", "name": "Buổi học 2", "startTime": new Date("2024-02-23T10:00:00.000Z"), "endTime": new Date("2024-02-23T12:00:00.000Z") },
  { "id": "sec-027", "classId": "cls-014", "name": "Buổi học 1", "startTime": new Date("2024-02-22T10:00:00.000Z"), "endTime": new Date("2024-02-22T12:00:00.000Z") },
  { "id": "sec-028", "classId": "cls-014", "name": "Buổi học 2", "startTime": new Date("2024-02-24T10:00:00.000Z"), "endTime": new Date("2024-02-24T12:00:00.000Z") },
  { "id": "sec-029", "classId": "cls-015", "name": "Buổi học 1", "startTime": new Date("2024-02-21T13:00:00.000Z"), "endTime": new Date("2024-02-21T15:00:00.000Z") },
  { "id": "sec-030", "classId": "cls-015", "name": "Buổi học 2", "startTime": new Date("2024-02-23T13:00:00.000Z"), "endTime": new Date("2024-02-23T15:00:00.000Z") },
  { "id": "sec-031", "classId": "cls-016", "name": "Buổi học 1", "startTime": new Date("2024-02-22T13:00:00.000Z"), "endTime": new Date("2024-02-22T15:00:00.000Z") },
  { "id": "sec-032", "classId": "cls-016", "name": "Buổi học 2", "startTime": new Date("2024-02-24T13:00:00.000Z"), "endTime": new Date("2024-02-24T15:00:00.000Z") },
  { "id": "sec-033", "classId": "cls-017", "name": "Buổi học 1", "startTime": new Date("2024-02-21T14:00:00.000Z"), "endTime": new Date("2024-02-21T16:00:00.000Z") },
  { "id": "sec-034", "classId": "cls-017", "name": "Buổi học 2", "startTime": new Date("2024-02-23T14:00:00.000Z"), "endTime": new Date("2024-02-23T16:00:00.000Z") },
  { "id": "sec-035", "classId": "cls-018", "name": "Buổi học 1", "startTime": new Date("2024-02-22T14:00:00.000Z"), "endTime": new Date("2024-02-22T16:00:00.000Z") },
  { "id": "sec-036", "classId": "cls-018", "name": "Buổi học 2", "startTime": new Date("2024-02-24T14:00:00.000Z"), "endTime": new Date("2024-02-24T16:00:00.000Z") },
  { "id": "sec-037", "classId": "cls-019", "name": "Buổi học 1", "startTime": new Date("2024-02-21T15:00:00.000Z"), "endTime": new Date("2024-02-21T17:00:00.000Z") },
  { "id": "sec-038", "classId": "cls-019", "name": "Buổi học 2", "startTime": new Date("2024-02-23T15:00:00.000Z"), "endTime": new Date("2024-02-23T17:00:00.000Z") },
  { "id": "sec-039", "classId": "cls-020", "name": "Buổi học 1", "startTime": new Date("2024-02-22T15:00:00.000Z"), "endTime": new Date("2024-02-22T17:00:00.000Z") },
  { "id": "sec-040", "classId": "cls-020", "name": "Buổi học 2", "startTime": new Date("2024-02-24T15:00:00.000Z"), "endTime": new Date("2024-02-24T17:00:00.000Z") },
  { "id": "sec-041", "classId": "cls-021", "name": "Buổi học 1", "startTime": new Date("2024-02-21T08:00:00.000Z"), "endTime": new Date("2024-02-21T10:00:00.000Z") },
  { "id": "sec-042", "classId": "cls-021", "name": "Buổi học 2", "startTime": new Date("2024-02-23T08:00:00.000Z"), "endTime": new Date("2024-02-23T10:00:00.000Z") },
  { "id": "sec-043", "classId": "cls-022", "name": "Buổi học 1", "startTime": new Date("2024-02-22T08:00:00.000Z"), "endTime": new Date("2024-02-22T10:00:00.000Z") },
  { "id": "sec-044", "classId": "cls-022", "name": "Buổi học 2", "startTime": new Date("2024-02-24T08:00:00.000Z"), "endTime": new Date("2024-02-24T10:00:00.000Z") },
  { "id": "sec-045", "classId": "cls-023", "name": "Buổi học 1", "startTime": new Date("2024-02-21T10:00:00.000Z"), "endTime": new Date("2024-02-21T12:00:00.000Z") },
  { "id": "sec-046", "classId": "cls-023", "name": "Buổi học 2", "startTime": new Date("2024-02-23T10:00:00.000Z"), "endTime": new Date("2024-02-23T12:00:00.000Z") },
  { "id": "sec-047", "classId": "cls-024", "name": "Buổi học 1", "startTime": new Date("2024-02-22T10:00:00.000Z"), "endTime": new Date("2024-02-22T12:00:00.000Z") },
  { "id": "sec-048", "classId": "cls-024", "name": "Buổi học 2", "startTime": new Date("2024-02-24T10:00:00.000Z"), "endTime": new Date("2024-02-24T12:00:00.000Z") },
  { "id": "sec-049", "classId": "cls-025", "name": "Buổi học 1", "startTime": new Date("2024-02-21T13:00:00.000Z"), "endTime": new Date("2024-02-21T15:00:00.000Z") },
  { "id": "sec-050", "classId": "cls-025", "name": "Buổi học 2", "startTime": new Date("2024-02-23T13:00:00.000Z"), "endTime": new Date("2024-02-23T15:00:00.000Z") },
  { "id": "sec-051", "classId": "cls-001", "name": "Buổi học 3", "startTime": new Date("2024-02-25T08:00:00.000Z"), "endTime": new Date("2024-02-25T10:00:00.000Z") },
  { "id": "sec-052", "classId": "cls-002", "name": "Buổi học 3", "startTime": new Date("2024-02-25T10:00:00.000Z"), "endTime": new Date("2024-02-25T12:00:00.000Z") },
  { "id": "sec-053", "classId": "cls-003", "name": "Buổi học 3", "startTime": new Date("2024-02-26T13:00:00.000Z"), "endTime": new Date("2024-02-26T15:00:00.000Z") },
  { "id": "sec-054", "classId": "cls-004", "name": "Buổi học 3", "startTime": new Date("2024-02-25T14:00:00.000Z"), "endTime": new Date("2024-02-25T16:00:00.000Z") },
  { "id": "sec-055", "classId": "cls-005", "name": "Buổi học 3", "startTime": new Date("2024-02-26T08:00:00.000Z"), "endTime": new Date("2024-02-26T10:00:00.000Z") },
  { "id": "sec-056", "classId": "cls-006", "name": "Buổi học 3", "startTime": new Date("2024-02-25T09:00:00.000Z"), "endTime": new Date("2024-02-25T11:00:00.000Z") },
  { "id": "sec-057", "classId": "cls-007", "name": "Buổi học 3", "startTime": new Date("2024-02-26T10:00:00.000Z"), "endTime": new Date("2024-02-26T12:00:00.000Z") },
];

export const studentInClasses = [
  {
    "studentId": "std-010",
    "classId": "cls-054"
  },
  {
    "studentId": "std-015",
    "classId": "cls-013"
  },
  {
    "studentId": "std-009",
    "classId": "cls-013"
  },
  {
    "studentId": "std-040",
    "classId": "cls-038"
  },
  {
    "studentId": "std-025",
    "classId": "cls-012"
  },
  {
    "studentId": "std-028",
    "classId": "cls-014"
  },
  {
    "studentId": "std-031",
    "classId": "cls-003"
  },
  {
    "studentId": "std-029",
    "classId": "cls-012"
  },
  {
    "studentId": "std-015",
    "classId": "cls-025"
  },
  {
    "studentId": "std-058",
    "classId": "cls-030"
  },
  {
    "studentId": "std-023",
    "classId": "cls-031"
  },
  {
    "studentId": "std-002",
    "classId": "cls-013"
  },
  {
    "studentId": "std-053",
    "classId": "cls-012"
  },
  {
    "studentId": "std-039",
    "classId": "cls-005"
  },
  {
    "studentId": "std-031",
    "classId": "cls-049"
  },
  {
    "studentId": "std-001",
    "classId": "cls-048"
  },
  {
    "studentId": "std-050",
    "classId": "cls-044"
  },
  {
    "studentId": "std-049",
    "classId": "cls-029"
  },
  {
    "studentId": "std-055",
    "classId": "cls-005"
  },
  {
    "studentId": "std-037",
    "classId": "cls-021"
  },
  {
    "studentId": "std-011",
    "classId": "cls-008"
  },
  {
    "studentId": "std-033",
    "classId": "cls-050"
  },
  {
    "studentId": "std-007",
    "classId": "cls-006"
  },
  {
    "studentId": "std-010",
    "classId": "cls-022"
  },
  {
    "studentId": "std-014",
    "classId": "cls-029"
  },
  {
    "studentId": "std-008",
    "classId": "cls-023"
  },
  {
    "studentId": "std-054",
    "classId": "cls-035"
  },
  {
    "studentId": "std-042",
    "classId": "cls-006"
  },
  {
    "studentId": "std-035",
    "classId": "cls-040"
  },
  {
    "studentId": "std-019",
    "classId": "cls-041"
  },
  {
    "studentId": "std-035",
    "classId": "cls-054"
  },
  {
    "studentId": "std-016",
    "classId": "cls-024"
  },
  {
    "studentId": "std-046",
    "classId": "cls-052"
  },
  {
    "studentId": "std-052",
    "classId": "cls-010"
  },
  {
    "studentId": "std-040",
    "classId": "cls-015"
  },
  {
    "studentId": "std-026",
    "classId": "cls-048"
  },
  {
    "studentId": "std-030",
    "classId": "cls-002"
  },
  {
    "studentId": "std-025",
    "classId": "cls-049"
  },
  {
    "studentId": "std-050",
    "classId": "cls-040"
  },
  {
    "studentId": "std-004",
    "classId": "cls-026"
  },
  {
    "studentId": "std-006",
    "classId": "cls-038"
  },
  {
    "studentId": "std-051",
    "classId": "cls-009"
  },
  {
    "studentId": "std-049",
    "classId": "cls-028"
  },
  {
    "studentId": "std-029",
    "classId": "cls-003"
  },
  {
    "studentId": "std-019",
    "classId": "cls-027"
  },
  {
    "studentId": "std-024",
    "classId": "cls-036"
  },
  {
    "studentId": "std-004",
    "classId": "cls-001"
  },
  {
    "studentId": "std-037",
    "classId": "cls-004"
  },
  {
    "studentId": "std-041",
    "classId": "cls-019"
  },
  {
    "studentId": "std-052",
    "classId": "cls-015"
  },
  {
    "studentId": "std-019",
    "classId": "cls-013"
  },
  {
    "studentId": "std-026",
    "classId": "cls-035"
  },
  {
    "studentId": "std-029",
    "classId": "cls-039"
  },
  {
    "studentId": "std-031",
    "classId": "cls-029"
  },
  {
    "studentId": "std-031",
    "classId": "cls-045"
  },
  {
    "studentId": "std-025",
    "classId": "cls-034"
  },
  {
    "studentId": "std-013",
    "classId": "cls-053"
  },
  {
    "studentId": "std-010",
    "classId": "cls-016"
  },
  {
    "studentId": "std-003",
    "classId": "cls-007"
  },
  {
    "studentId": "std-034",
    "classId": "cls-017"
  },
  {
    "studentId": "std-030",
    "classId": "cls-030"
  },
  {
    "studentId": "std-043",
    "classId": "cls-025"
  },
  {
    "studentId": "std-010",
    "classId": "cls-020"
  },
  {
    "studentId": "std-053",
    "classId": "cls-015"
  },
  {
    "studentId": "std-007",
    "classId": "cls-023"
  },
  {
    "studentId": "std-041",
    "classId": "cls-053"
  },
  {
    "studentId": "std-002",
    "classId": "cls-017"
  },
  {
    "studentId": "std-033",
    "classId": "cls-044"
  },
  {
    "studentId": "std-036",
    "classId": "cls-001"
  },
  {
    "studentId": "std-051",
    "classId": "cls-019"
  },
  {
    "studentId": "std-002",
    "classId": "cls-010"
  },
  {
    "studentId": "std-013",
    "classId": "cls-016"
  },
  {
    "studentId": "std-013",
    "classId": "cls-047"
  },
  {
    "studentId": "std-038",
    "classId": "cls-015"
  },
  {
    "studentId": "std-048",
    "classId": "cls-007"
  },
  {
    "studentId": "std-017",
    "classId": "cls-032"
  },
  {
    "studentId": "std-053",
    "classId": "cls-055"
  },
  {
    "studentId": "std-017",
    "classId": "cls-053"
  },
  {
    "studentId": "std-051",
    "classId": "cls-013"
  },
  {
    "studentId": "std-012",
    "classId": "cls-043"
  }
];
