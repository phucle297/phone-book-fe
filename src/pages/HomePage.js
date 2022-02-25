// /* eslint-disable react-hooks/exhaustive-deps */
// import { Input, Table } from "antd";
// import React, { useState } from "react";
// import { getUserInfoAction } from "../redux/actions/UserAction";
// import { parseJwt } from "../util/setting";
// const { Search } = Input;
// const columns = [
//   {
//     title: "Id",
//     dataIndex: "userId",
//     width: 60,
//     fixed: "left",
//   },
//   {
//     title: "Họ tên",
//     dataIndex: "name",
//     width: 130,
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     width: 200,
//   },
//   {
//     title: "Số điện thoại",
//     dataIndex: "phone",
//     width: 130,
//   },
//   {
//     title: "Địa chỉ",
//     dataIndex: "address",
//     width: 300,
//   },
//   {
//     title: "Avatar",
//     dataIndex: "avatar",
//     render: (text, index) => (
//       <img
//         src={text}
//         alt=""
//         className="w-12 rounded-full"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = `https://picsum.photos/200/200`;
//         }}
//       />
//     ),
//     width: 80,
//   },
//   {
//     title: "Công ty",
//     dataIndex: "companyName",
//     width: 100,
//   },
// ];
// const data = [];
// for (let i = 0; i < 100; i++) {
//   const email = `user${i}@gmail.com`;
//   const name = `user${i}`;
//   const address = `address ${i}`;
//   const password = `user1234`;
//   const companyId = (i % 3) + 1;
//   let phone;
//   if (i < 10) phone = `080812300${i}`;
//   else if (i < 100) phone = `08081230${i}`;
//   data.push({
//     key: i,
//     userId: i,
//     name,
//     phone,
//     email,
//     address,
//     password,
//     companyId,
//     avatar: "https://picsum.photos/200/200",
//   });
// }

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   getCheckboxProps: (record) => ({
//     // Column configuration not to be checked
//     name: record.name,
//   }),
// };
// const onSearch = (value) => console.log(value);
// const HomePage = () => {
//   const dispatch = React.useDispatch();
//   React.useEffect(async () => {
//     const id = await parseJwt();
//     const action = getUserInfoAction(id);
//     dispatch(action);
//   }, []);
//   const { userDetail } = React.useSelector(({ state }) => state.UserReducer);
//   console.log("UserDetail", userDetail);
//   const [selectionType, setSelectionType] = useState("checkbox");
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold m-5">Danh bạ</h1>
//       <div className="controller flex items-center justify-around my-2">
//         <Search
//           placeholder="input search text"
//           onSearch={onSearch}
//           enterButton
//         />
//         <button className="bg-sky-400 hover:bg-sky-500 rounded ml-3 px-2 py-2 w-28 font-bold">
//           Gửi Email
//         </button>
//         <button className="bg-green-400 hover:bg-green-500 rounded ml-3 px-2 py-2 w-28 font-bold">
//           Gửi SMS
//         </button>
//       </div>
//       <Table
//         rowSelection={{
//           type: selectionType,
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//         scroll={{ x: 1000, y: window.innerHeight - 280 }}
//       />
//     </div>
//   );
// };

// export default HomePage;
import React from 'react'

export default function HomePage() {
  return (
    <div>HomePage</div>
  )
}
