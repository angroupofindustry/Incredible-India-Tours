// 37 destinations covering all 28 states + 8 UTs + 1 multi-state premium
// Each: id, title, state, city, days, price, img, premium?
const STATES = ['All','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'];

const TOURS = [
  {id:'ap-tirupati', title:'Sacred Tirupati Darshan', state:'Andhra Pradesh', city:'Tirupati', days:2, price:7999, img:'https://images.unsplash.com/photo-1599661046175-1a2f03f06abb?q=80&w=1200&auto=format&fit=crop'},
  {id:'ar-tawang', title:'Tawang Monastery & Meadows', state:'Arunachal Pradesh', city:'Tawang', days:5, price:24999, img:'https://images.unsplash.com/photo-1615971201695-5a2c22d1438d?q=80&w=1200&auto=format&fit=crop'},
  {id:'as-kaziranga', title:'Kaziranga Rhino Safari', state:'Assam', city:'Kaziranga', days:3, price:18999, img:'https://images.unsplash.com/photo-1546185044-289d7a0df9d9?q=80&w=1200&auto=format&fit=crop'},
  {id:'br-bodhgaya', title:'Bodh Gaya Heritage', state:'Bihar', city:'Gaya', days:3, price:12999, img:'https://images.unsplash.com/photo-1622497174285-3be5e1e9852d?q=80&w=1200&auto=format&fit=crop'},
  {id:'ct-bastar', title:'Bastar Tribal Trails', state:'Chhattisgarh', city:'Jagdalpur', days:4, price:16999, img:'https://images.unsplash.com/photo-1603273809333-f833dfd6fbea?q=80&w=1200&auto=format&fit=crop'},
  {id:'ga-beaches', title:'Goa Beach Escape', state:'Goa', city:'Panaji', days:4, price:15999, img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'gj-kutch', title:'White Rann of Kutch', state:'Gujarat', city:'Bhuj', days:3, price:17999, img:'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop'},
  {id:'hr-kurukshetra', title:'Kurukshetra Heritage Circuit', state:'Haryana', city:'Kurukshetra', days:2, price:7999, img:'https://images.unsplash.com/photo-1560151158-4b2d4b2d4f54?q=80&w=1200&auto=format&fit=crop'},
  {id:'hp-manali', title:'Himalayan Manali Getaway', state:'Himachal Pradesh', city:'Manali', days:5, price:22999, img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'jh-netarhat', title:'Netarhat Queen of Chotanagpur', state:'Jharkhand', city:'Netarhat', days:3, price:11999, img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'},
  {id:'ka-coorg', title:'Coorg Coffee & Falls', state:'Karnataka', city:'Madikeri', days:3, price:14999, img:'https://images.unsplash.com/photo-1562767467-4259ac6f6a7a?q=80&w=1200&auto=format&fit=crop'},
  {id:'kl-backwaters', title:'Kerala Backwaters Cruise', state:'Kerala', city:'Alappuzha', days:4, price:21999, img:'https://images.unsplash.com/photo-1593697820984-660c4c2b810a?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'mp-khajuraho', title:'Khajuraho Temples & Tigres', state:'Madhya Pradesh', city:'Khajuraho', days:4, price:19999, img:'https://images.unsplash.com/photo-1572061401845-2d57ce1e7e3f?q=80&w=1200&auto=format&fit=crop'},
  {id:'mh-konkan', title:'Konkan Coast Roadtrip', state:'Maharashtra', city:'Ratnagiri', days:4, price:18999, img:'https://images.unsplash.com/photo-1565432246108-0226ab8f23a7?q=80&w=1200&auto=format&fit=crop'},
  {id:'mn-loktak', title:'Loktak Floating Islands', state:'Manipur', city:'Moirang', days:3, price:16999, img:'https://images.unsplash.com/photo-1631445309751-3e5fe9ca481b?q=80&w=1200&auto=format&fit=crop'},
  {id:'ml-cherrapunji', title:'Cherrapunji Living Roots', state:'Meghalaya', city:'Sohra', days:3, price:17999, img:'https://images.unsplash.com/photo-1612108913616-1f0adf7ee804?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'mz-ailawng', title:'Mizoram Hills & Culture', state:'Mizoram', city:'Aizawl', days:3, price:15999, img:'https://images.unsplash.com/photo-1545153996-bde9f0be0f88?q=80&w=1200&auto=format&fit=crop'},
  {id:'nl-dzukou', title:'Dzukou Valley Trek', state:'Nagaland', city:'Viswema', days:3, price:16999, img:'https://images.unsplash.com/photo-1602687074000-5b4846466a39?q=80&w=1200&auto=format&fit=crop'},
  {id:'od-puri', title:'Puri & Konark Heritage', state:'Odisha', city:'Puri', days:3, price:13999, img:'https://images.unsplash.com/photo-1578916171728-46686eac2f64?q=80&w=1200&auto=format&fit=crop'},
  {id:'pb-amritsar', title:'Amritsar Golden Circuit', state:'Punjab', city:'Amritsar', days:2, price:9999, img:'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'},
  {id:'rj-jaipur', title:'Jaipur Royal Triangle', state:'Rajasthan', city:'Jaipur', days:3, price:14999, img:'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'sk-gangtok', title:'Gangtok & Tsomgo Lake', state:'Sikkim', city:'Gangtok', days:4, price:21999, img:'https://images.unsplash.com/photo-1611339555312-35c50a6481d8?q=80&w=1200&auto=format&fit=crop'},
  {id:'tn-madurai', title:'Madurai Temple Trail', state:'Tamil Nadu', city:'Madurai', days:3, price:13999, img:'https://images.unsplash.com/photo-1610030469983-98b54e3ef6b9?q=80&w=1200&auto=format&fit=crop'},
  {id:'tg-hyderabad', title:'Hyderabad Heritage & Biryani', state:'Telangana', city:'Hyderabad', days:3, price:14999, img:'https://images.unsplash.com/photo-1603264040524-6b0a2fefc79b?q=80&w=1200&auto=format&fit=crop'},
  {id:'tr-agartala', title:'Agartala Palaces & Lakes', state:'Tripura', city:'Agartala', days:3, price:11999, img:'https://images.unsplash.com/photo-1653465203853-71fd80d7cc5c?q=80&w=1200&auto=format&fit=crop'},
  {id:'up-varanasi', title:'Varanasi Ghats & Ganga Aarti', state:'Uttar Pradesh', city:'Varanasi', days:3, price:15999, img:'https://images.unsplash.com/photo-1578926375605-eaf7559b145d?q=80&w=1200&auto=format&fit=crop'},
  {id:'uk-rishikesh', title:'Rishikesh Yoga & Rapids', state:'Uttarakhand', city:'Rishikesh', days:3, price:14999, img:'https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=1200&auto=format&fit=crop'},
  {id:'wb-sundarbans', title:'Sundarbans Mangrove Safari', state:'West Bengal', city:'Canning', days:3, price:16999, img:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop'},
  // UTs
  {id:'an-havelock', title:'Andaman Havelock Bliss', state:'Andaman & Nicobar Islands', city:'Havelock', days:4, price:28999, img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'ch-rockgarden', title:'Chandigarh Corbusier Trails', state:'Chandigarh', city:'Chandigarh', days:2, price:8999, img:'https://images.unsplash.com/photo-1589039010235-a1b7ec5a2df1?q=80&w=1200&auto=format&fit=crop'},
  {id:'dn-silvassa', title:'Silvassa & Daman Shores', state:'Dadra & Nagar Haveli and Daman & Diu', city:'Silvassa', days:3, price:12999, img:'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'},
  {id:'dl-delhi', title:'Delhi Heritage Walks', state:'Delhi', city:'New Delhi', days:2, price:8999, img:'https://images.unsplash.com/photo-1549890762-0a3f8933bcf3?q=80&w=1200&auto=format&fit=crop'},
  {id:'jk-kashmir', title:'Kashmir Valley Sojourn', state:'Jammu & Kashmir', city:'Srinagar', days:5, price:25999, img:'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'la-nubra', title:'Ladakh Nubra & Pangong', state:'Ladakh', city:'Leh', days:5, price:28999, img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'ld-agatti', title:'Lakshadweep Coral Reefs', state:'Lakshadweep', city:'Agatti', days:4, price:34999, img:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop', premium:true},
  {id:'py-pondy', title:'Puducherry French Quarter', state:'Puducherry', city:'Puducherry', days:2, price:10999, img:'https://images.unsplash.com/photo-1592782112579-9b0271e1aefa?q=80&w=1200&auto=format&fit=crop'},
  // Extra multi-state premium to make 37
  {id:'gt-goldtri', title:'Golden Triangle Signature', state:'Multi‑State', city:'Delhi • Agra • Jaipur', days:5, price:27999, img:'https://images.unsplash.com/photo-1549643561-0ff00609b9b3?q=80&w=1200&auto=format&fit=crop', premium:true}
];
