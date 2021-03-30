.store aside {
  border: none;
  width: 400px;
}
.store aside img {
  width: 100%;
}

.store main  {
  text-align: left;
}

.store section {
  background: white;
  padding: 0;
}

.store .price .value {
  font-size: 24px;
  color:  {{site.Param "color"}};
}

.store aside button {
  margin: 10px 0;
}

.store .tags {
  text-align: right;
}

.store .intro {
  text-align: center;
}

.store main {
  width: 100%;
}

.store aside select {
  margin: 10px 0;
  padding: 0;
  width: 100%;
}

.cart {
  float: right;
  margin: 20px 10px;
}

.cart > button {
  background: transparent;
  padding: 3px 10px;
  border: none;
  color: {{site.Param "color"}};
  position: relative;

}

.cart {
  visibility: hidden;
}

.cart.visible {
  visibility: visible;
}

.cart .delete svg {
  width: 15px;
  float: right;
  fill: red;
  cursor: pointer;
}

.cart .right {
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex-direction: column;
}

.cart .right {
  padding: 0;
}

.cart .badge {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  background: {{site.Param "color"}};
  width: 12px;
  height: 12px;
  color: white;
  font-size: 10px;
  line-height: 12px;
  border-radius: 6px;
}

.cart > button:hover {
  background-color: {{site.Param "color"}};
  color: white;
}

.store .alert {
  border-radius: 5px;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 20px;
}

.store .alert .head {
  font-size: 20px;
  padding-bottom: 20px;
}

.cart > div {
  display: none;
  position: absolute;
  top: 80px;
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .3);
}

.cart > div {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, .1),
      0 10px 10px -5px rgba(0, 0, 0, .04);
}

.cart .item {
  padding: 5px;
  display: flex;
  flex-direction: row;
}

.cart .item .details {
  flex: 2;
  text-transform: capitalize;
  padding: 5px 10px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart .item .details .name {
  font-weight: normal;
}

.cart div a {
  width: 100%;
  padding: 0;
}

.cart div button {
  margin-bottom: 0;

}

.cart .item .details .color {
  margin: 10px 0;
  font-size: smaller;
  border: 1px solid #222;
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}

.price {
  display: inline-flex;
  min-width: 50px;
  padding: 4px 12px;
  align-items: flex-end;
  justify-content: flex-end;
  font-weight: bold;
  font-size: large;

}


.cart .item img {
  padding: 5px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.cart:hover > div {
  display: block;
}

.card {
  width: 250px;
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  margin: 10px;
  box-shadow: 1px 2px 2px 2px #DDD;
}

.card-img-top {
  width: 100%;
}

.card-title {
  height: 28px;
  font-size: 28px;
}

.card-text {
  height: 60px;
  padding-bottom: 20px;
  overflow: auto;

}

.store main .content {
  padding: 20px;
}

@media only screen and (min-width: 768px) {

  aside~main {
    max-width: calc(100% - 400px);
  }
}

@media only screen and (min-width: 992px) {
  aside~main {
    max-width: 400px;
  }
}

@media only screen and (min-width: 1200px) {

  aside~main {
    max-width: 600px;
  }
}
