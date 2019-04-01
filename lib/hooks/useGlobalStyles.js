import { useEffect } from 'react';

const appFontSize = '16px';
const appFontFamily =
  "'Roboto mono', 'Lucida Console', 'Courier New', monospace";

const globalBase = `
body {
  margin: 0;
  padding: 0;
}
body,
button {
  font-family: ${appFontFamily};
  font-size: ${appFontSize};
}
.flex-spacer {
  display: flex;
  flex: 1;
}
.center-contents {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  margin: 5px 0;

  &--left {
    justify-content: flex-start;
  }
  &--center {
    justify-content: center;
  }
  &--right {
    justify-content: flex-end;
  }
}
.radio-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}
`;

const floatLabel = `
@charset "UTF-8";.has-float-label{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}.has-float-label label{position:absolute;left:5px;top:1px;cursor:text;font-size:.75em;opacity:1;-webkit-transition:all .2s;transition:all .2s}.has-float-label select{-webkit-appearance:none;-moz-appearance:none;appearance:none}.has-float-label input,.has-float-label select{font-size:inherit;padding:0 .5em;padding-top:1em;margin-bottom:2px;border:0;border-radius:0;border-bottom:2px solid rgba(0,0,0,0.1)}.has-float-label input::-webkit-input-placeholder,.has-float-label select::-webkit-input-placeholder{opacity:1;-webkit-transition:all .2s;transition:all .2s}.has-float-label input:placeholder-shown:not(:focus)::-webkit-input-placeholder,.has-float-label select:placeholder-shown:not(:focus)::-webkit-input-placeholder{opacity:0}.has-float-label input:placeholder-shown:not(:focus) + :not(.input-has-content),.has-float-label select:placeholder-shown:not(:focus) + :not(.input-has-content){font-size:1.3em;opacity:.7;pointer-events:none;top:.6em;left:.3em}.has-float-label input:focus,.has-float-label select:focus{outline:none;border-color:rgba(0,0,0,0.5)}.has-float-label select{margin-bottom:0}.has-float-label.input-list-container input{padding-bottom:.3em}.has-float-label.input-list-container input:placeholder-shown:not(:focus) + :not(.input-has-content){font-size:1.3em;opacity:.7;pointer-events:none;top:1em}.has-float-label.select-container::after{content:"⌵";position:absolute;top:50%;right:5px;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);font-weight:700;pointer-events:none}
`;

const ripple = `
.ripple{position:relative;overflow:hidden}.ripple:after{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none;background-image:-webkit-radial-gradient(#666,#000 10%,transparent 10.01%);background-image:radial-gradient(#666,#000 10%,transparent 10.01%);background-repeat:no-repeat;background-position:50%;-webkit-transform:scale(10,10);-ms-transform:scale(10,10);transform:scale(10,10);opacity:0;-webkit-transition:-webkit-transform 0.5s,opacity 1s;transition:transform 0.5s,opacity 1s}.ripple:active:after{-webkit-transform:scale(0,0);-ms-transform:scale(0,0);transform:scale(0,0);opacity:.2;-webkit-transition:0;transition:0}
`;

export function useGlobalStyles() {
  useEffect(() => {
    const tag = document.createElement('style');
    tag.setAttribute('data-mko-global-styles', '');
    tag.textContent = [globalBase, floatLabel, ripple].join('\r\n');

    document.head.appendChild(tag);
  }, []);
}
