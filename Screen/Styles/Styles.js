import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  title: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lefttext: {
    fontFamily:'Pretendard-Regular',
    position: 'absolute',
    left: '4%', 
    fontSize: 14,
    color: '#000000',
  },
  timeout: {
    fontFamily:'Pretendard-Regular',
    position: 'absolute',
    right: '35%', 
    fontSize: 14,
    color: '#ff2f2f',

  },
  smallInput: {
    position: 'absolute',
    height: 45,
    left: '2.56%', 
    right: '34.62%',
    backgroundColor: '#F4F4F4',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },
  Input: {
    position: 'absolute',
    height: 45,
    left: '2.56%', // 리액트 네이티브에서는 백분율로 위치를 지정할 수 있습니다.
    right: '2.56%',
    backgroundColor: '#F4F4F4',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  podo: {
    position: 'absolute',
    top: 132,
    fontFamily:'Pretendard-ExtraBold',
    lineHeight: 40,
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 0.59,
    color: '#3BCDA1',
  },
  postDonation: {
    fontFamily:'Pretendard-Bold',
    position: 'absolute',
    top: 167,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 0.59,
    color: '#3BCDA1',
  },
  PretendardRegular: {
    fontFamily:'Pretendard-Regular',
  },
  PretendardBold: {
    fontFamily:'Pretendard-Bold',
  },
  smalltouchbox: {
    position: 'absolute',
    left: '67.94%',
    right: '2.56%',
    height: 45,
    backgroundColor: '#3BCDA1',
    borderRadius: 8,
    justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
    alignItems: 'center', // 텍스트를 가로로 중앙에 위치시키기 위해 추가
    

  },  
  touchbox: {
    position: 'absolute',
    left: '2.56%',
    right: '2.56%',
    height: 45,
    backgroundColor: '#3BCDA1',
    borderRadius: 8,
    justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
    alignItems: 'center', // 텍스트를 가로로 중앙에 위치시키기 위해 추가
    
  },
  registerText: {
    position: 'absolute',
    left: '3.33%',
    top: 477,
  },
  kakaoButton: {
    position: 'absolute',
    left: '2.56%',
    right: '2.56%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#FEE500',
    top: 532,
    justifyContent: 'center'
  },
  innerContainer: {
    flexDirection: 'row',  // 가로로 배열
    justifyContent: 'center', // 가운데 정렬
    alignItems: 'center', // 세로 방향으로도 가운데 정렬
  },
  kakaoIcon: {
    top: 0,
    width: 16,
    height: 15,
    marginRight: 4, // 로고와 텍스트 사이의 간격
  },
  passwordText: {
    position: 'absolute',
    right: '3.33%',
    top: 477,
  },

  Setpassword: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3BCDA1',
  },


  listItem: {
    width: '45%',
    marginTop: '2%'
  },
  image: {
    aspectRatio: 1,
    borderRadius: 15,
  },
  brandtext: {
    fontFamily:'Pretendard-Regular',
     
    fontSize: 12,
    color: '#8C8989', 

  },
  itemName: {
    fontFamily:'Pretendard-Regular',
     
    fontSize: 14,
    color: '#000000', 
  },
  price: {
    fontFamily:'Pretendard-Medium',
     
    fontSize: 16,
    color: '#000000',

  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
  // 나머지 스타일들도 동일한 패턴으로 추가
});

export default styles;

