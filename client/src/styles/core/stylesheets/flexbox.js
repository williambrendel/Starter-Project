"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const FLEXBOX = getStylesheet(`
/* 
 * Classes
 * -------
 */
.flex,
.row,
.column {
  display: flex;
}

.flex.shrink,
.row.shrink,
.column.shrink {
  flex-shrink: 1;
}

.flex.grow,
.row.grow,
.column.grow {
  flex-grow: 1;
}

/* Reverse ordering */
.flex.reverse,
.row.reverse {
  flex-direction: row-reverse;
}

.column.reverse {
  flex-direction: column-reverse;
}

/* Row positioning */
/* Container: left middle right spread | top center bottom */
/* Children: fill | extend */
.flex.top,
.row.top {
  align-items: flex-start;
}

.flex.left,
.row.left {
  justify-content: flex-start;
}

.flex.bottom,
.row.bottom {
  align-items: flex-end;
}

.flex.right,
.row.right {
  justify-content: flex-end;
}

.flex.center,
.row.center {
  align-items: center;
}

.flex.middle,
.row.middle {
  justify-content: center;
}

.flex > .self-top,
.row > .self-top,
.column > .self-left {
  align-self: flex-start;
}

.flex > .self-bottom,
.row > .self-bottom,
.column > .self-right {
  align-self: flex-end;
}

.flex > .self-center,
.row > .self-center,
.column > .self-middle {
  align-self: center;
}

/* Element stretching */
.flex.fill,
.flex .fill,
.row .fill:not(.vertical),
.row .extend.horizontal,
.column .fill:not(.horizontal),
.column .extend.vertical {
  flex: 1;
}

.row.full {
  width: 100%;
  height: auto;
}

.row .extend:not(.horizontal),
.row .fill.vertical {
  height: 100%;
}

/* Element spacing */
.flex.spread,
.column.spread,
.row.spread {
  justify-content: space-between;
}

.flex.spread.evenly,
.column.spread.evenly,
.row.spread.evenly {
  justify-content: space-evenly;
}

.flex.spread.around,
.column.spread.around,
.row.spread.around {
  justify-content: space-around;
}

.column {
  flex-direction: column;
}

/* Column positioning */
/* Container: left middle right | top center bottom spread */
/* Children: extend | fill */
.column.top {
  justify-content: flex-start;
}

.column.left {
  align-items: flex-start;
}

.column.bottom {
  justify-content: flex-end;
}

.column.right {
  align-items: flex-end;
}

.column.middle {
  align-items: center;
}

.column.center {
  justify-content: center;
}

/* Element stretching */
.column.full {
  width: auto;
  height: 100%;
}

.column .fill.horizontal,
.column .extend:not(.vertical) {
  width: 100%;
}

/* Responsive styles */
@media only screen and (max-width: 640px) {
  .row.responsive {
    flex-direction: column;
  }

  .row.reverse-responsive  {
    flex-direction: column-reverse;
  }

  .row.reverse-responsive .column.responsive.right,
  .row.reverse-responsive .column.responsive.left,
  .row.responsive .column.responsive.right,
  .row.responsive .column.responsive.left {
    align-items: center;
  }

  .row.reverse-responsive.left .column.responsive.right,
  .row.reverse-responsive.left .column.responsive.left,
  .row.responsive.left .column.responsive.right,
  .row.responsive.left .column.responsive.left {
    align-items: flex-start;
  }

  .row.reverse-responsive.right .column.responsive.right,
  .row.reverse-responsive.right .column.responsive.left,
  .row.responsive.right .column.responsive.right,
  .row.responsive.right .column.responsive.left {
    align-items: flex-end;
  }

  .row.reverse-responsive .column.responsive.fill,
  .row.responsive .column.responsive.fill {
    width: 100%;
  }
}

.flex.wrap,
.row.wrap,
.column.wrap {
  flex-wrap: wrap;
}

.flex.nowrap,
.row.nowrap,
.column.nowrap {
  flex-wrap: nowrap;
}

.flex.wrap-reverse,
.row.wrap-reverse,
.column.wrap-reverse {
  flex-wrap: wrap-reverse;
}

.overflow-wrap {
  overflow: auto;
}

.row.overflow-wrap {
  overflow-x: auto;
}

.column.overflow-wrap {
  overflow-y: auto;
}

@media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
  .row.overflow-wrap,
  .column.overflow-wrap,
  .overflow-wrap {
    flex-wrap: wrap;
  }
}

@media (hover: none), (pointer: coarse) {
  .row.overflow-wrap.middle {
    justify-content: flex-start !important;
  }

  .row.overflow-wrap::before {
    content: ' ';
  }
  
  .row.overflow-wrap::after {
    content: ' ';
  }
  
  .row.overflow-wrap.middle::before {
    content: ' ';
    margin-left: auto;
  }
  
  .row.overflow-wrap.middle::after {
    content: ' ';
    margin-right: auto;
  }
}
`);

// Exports.
export default Object.freeze(Object.defineProperty(FLEXBOX, "FLEXBOX", {
  value: FLEXBOX
}));