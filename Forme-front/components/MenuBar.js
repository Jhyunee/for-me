import React from 'react';
import { View, StyleSheet, TouchableOpacity  } from 'react-native';
import { Menu } from 'react-native-popup-menu';
import { SvgXml } from 'react-native-svg';

const HomeSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#FFFFFF"/>
   </svg>
   `;
   const StatSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM13.75 10C13.75 10.4142 14.0858 10.75 14.5 10.75H15.1893L13.1768 12.7626C13.0791 12.8602 12.9209 12.8602 12.8232 12.7626L11.2374 11.1768C10.554 10.4934 9.44598 10.4934 8.76256 11.1768L6.46967 13.4697C6.17678 13.7626 6.17678 14.2374 6.46967 14.5303C6.76256 14.8232 7.23744 14.8232 7.53033 14.5303L9.82322 12.2374C9.92085 12.1398 10.0791 12.1398 10.1768 12.2374L11.7626 13.8232C12.446 14.5066 13.554 14.5066 14.2374 13.8232L16.25 11.8107V12.5C16.25 12.9142 16.5858 13.25 17 13.25C17.4142 13.25 17.75 12.9142 17.75 12.5V10C17.75 9.58579 17.4142 9.25 17 9.25H14.5C14.0858 9.25 13.75 9.58579 13.75 10Z" fill="#FFFFFF"/>
 </svg>
   `;
   const CommSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#FFFFFF"/>
 </svg>
   `;
 
   const UserSvg = `
   <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#FFFFFF"/>
 </svg>
   `;
 
   const WriteSvg = `
   <svg fill="#FFFFFF" width="37px" height="37px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>note-edit-solid</title>
     <path d="M33,6.4,29.3,2.7a1.71,1.71,0,0,0-2.36,0L23.65,6H6A2,2,0,0,0,4,8V30a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V11.76l3-3A1.67,1.67,0,0,0,33,6.4ZM18.83,20.13l-4.19.93,1-4.15,9.55-9.57,3.23,3.23ZM29.5,9.43,26.27,6.2l1.85-1.85,3.23,3.23Z" class="clr-i-solid clr-i-solid-path-1"></path>
     <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
 </svg>
   `;


const MenuBar = ({ onSelect, onWritePress  }) => {
  return (
    <View style={styles.menuBar}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => onSelect('MainT')}>
          <SvgXml xml={HomeSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => onSelect('Stat')}>
          <SvgXml xml={StatSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => onSelect('Community')}>
          <SvgXml xml={CommSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon} onPress={() => onSelect('MyPage')}>
          <SvgXml xml={UserSvg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon}  onPress={onWritePress}>
          <SvgXml xml={WriteSvg} />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    menuBar: {
        height: 60,
        backgroundColor: "#508BFF",
        flexDirection: "row",
        justifyContent: "space-around",
        position: 'absolute',
        bottom: 0, // 화면 하단에 고정
        left: 0, // 왼쪽 정렬
        right: 0, // 오른쪽 정렬 
        // flex: 1
      },
      menuIcon: {
        margin: 10,
      },
      iconContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      },
});

export default MenuBar;