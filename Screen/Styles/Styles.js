import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
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

  button: {
    height: 50,
    left: '0%',
    backgroundColor: '#3BCDA1',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 5,
  },


  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
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
  emailtext: {
    fontFamily:'Pretendard-Regular',
    position: 'absolute',
    left: '3.33%',
    fontSize: 14,
    color: '#000000',
  },

  passwordtext: {
    position: 'absolute',
    left: '3.33%',
    top: 306,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  
  loginbox: {
    position: 'absolute',
    left: '2.56%',
    right: '2.56%',
    height: 45,
    backgroundColor: '#3BCDA1',
    borderRadius: 8,
  },

  loginButton: {
    height: 45,
    justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
    alignItems: 'center', // 텍스트를 가로로 중앙에 위치시키기 위해 추가
  },

  loginText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
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
  },
  kakaoButton2: {
    height: 45,
    justifyContent: 'center', // 이것은 유지
  },
  innerContainer: {
    flexDirection: 'row',  // 가로로 배열
    justifyContent: 'center', // 가운데 정렬
    alignItems: 'center', // 세로 방향으로도 가운데 정렬
  },
  kakaoIcon: {
    top: 0.5,
    width: 16,
    height: 15,
    marginRight: 5, // 로고와 텍스트 사이의 간격
  },
  kakaoText: {
    top:-1,
    fontFamily: 'Pretendard-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
  },
  passwordText: {
    position: 'absolute',
    right: '3.33%',
    top: 477,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },

  Setpassword: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3BCDA1',
  },

  // 나머지 스타일들도 동일한 패턴으로 추가
});

export default styles;
