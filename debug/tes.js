define(["./my-app.js"], function(_myApp) {
    "use strict";
    class MyBeritaAcara extends _myApp.PageViewElement {
        static get properties() {
            return { // This is the data from the store.
                page: {
                    type: Number
                },
                absen: {
                    hasChanged: () => !0 // see https://github.com/Polymer/lit-element/issues/107#issuecomment-416376381
                },
                idJadwalKuliah: {
                    type: Number
                },
                mtkuliah: {
                    type: String
                },
                kelas: {
                    type: String
                },
                jam: {
                    type: String
                },
                hari: {
                    type: String
                },
                jenjang: {
                    type: String
                },
                dosen: {
                    type: String
                },
                ruang: {
                    type: String
                },
                nama: {
                    type: String
                },
                tanggal: {
                    type: String
                },
                strJam_masuk: {
                    type: String
                },
                keterangan: {
                    type: String
                },
                kehadiran: {
                    type: String
                },
                textAbsen: {
                    type: String
                },
                valid: {
                    type: Number
                },
                jmlPresensi: {
                    type: Number
                },
                status_absen: {
                    type: Number
                }
            }
        }
        static get styles() {
            return [_myApp.SharedStyles]
        }
        getUrlVars() {
            var vars = {},
                parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                    vars[key] = value
                });
            return vars
        }
        constructor() {
            super();
            this.page = 0
        }
        firstUpdated() {
            super.firstUpdated();
            this.kehadiran = "Hadir";
            this.id = this.getUrlVars().id;
            fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/getAbsenDosenById/" + this.token + "/" + this.id).then(r => r.json()).then(data => {
                this.mtkuliah = data.mtkuliah;
                this.kelas = data.kelas;
                this.jam = data.jam;
                this.hari = data.hari;
                this.ruang = data.ruang;
                this.jenjang = data.jenjang;
                this.dosen = data.dosen;
                this.meeting_platform = data.meeting_platform;
                this.meeting_id = data.meeting_id;
                this.meeting_password = data.meeting_password;
                this.meeting_link = data.meeting_link;
                this.rps = data.rps;
                this.materi_kegiatan = data.materi_kegiatan;
                this.keterangan = data.keterangan;
                this.idJadwalKuliah = data.idJadwalKuliah;
                this.aktif = data.aktif;
                this.validasi = data.validasi;
                if (0 == this.validasi || 1 == this.validasi || 3 == this.validasi) {
                    window.alert("Pembayaran anda belum valid, silahkan menghubungi bagian keuangan, terimakasih")
                }
                this.text = data.text;
                var text = this.text; //console.log(text);
                let i = 0;
                const el = this.shadowRoot.querySelector("#marquee");
                setInterval(function() {
                    el.textContent = text.substring(i, text.length) + text.substring(0, i);
                    i = (i + 10) % text.length;
                    el.setAttribute("style", "color:red")
                }, 1e3)
            });
            this.fetchAbsenSiswa();
            this.fetchAllAbsenMahasiswa()
        }
        render() {
            return _myApp.html$1`
        <loading-overlay id="loading" with-backdrop no-cancel-on-outside-click></loading-overlay>
        
          <section>
          <div id="marquee"></div>
            <h2>Berita Acara Perkuliahan</h2>
            <table>
            <tr>
              <td>Mata Kuliah</td>
              <td>${this.mtkuliah}</td>
            </tr>
            <tr>
              <td>Kelas</td>
              <td>${this.kelas}</td>
            </tr>
            <tr>
              <td>Waktu</td>
              <td>${this.jam}</td>
            </tr>
            <tr>
              <td>Hari /  Ruang</td>
              <td>${this.hari} / ${this.ruang}</td>
            </tr>
            <tr>
              <td>Jenjang / Jurusan</td>
              <td>${this.jenjang}</td>
            </tr>
            <tr>
              <td>Dosen</td>
              <td>${this.dosen}</td>
            </tr>
            <tr>
              <td>Meeting Platform</td>
              <td>${this.meeting_platform}</td>
            </tr>
            <tr>
              <td>Meeting ID</td>
              <td>${this.meeting_id}</td>
            </tr>
            <tr>
              <td>Meeting Password</td>
              <td>${this.meeting_password}</td>
            </tr>
            <tr>
              <td>Meeting Link</td>
              <td>${this.meeting_link}</td>
            </tr>
          </table>
          </section>
         
          
          
          <section>
          <h3>ABSENSI MAHASISWA</h3>
          <table>
            <tr>
              <td>Nama</td>
              <td>${this.nama}</td>
            </tr>
            <tr>
            <td>Tanggal</td>
            <td>${this.tanggal}</td>
          </tr>
          <tr>
            <td>Jam Absen</td>
            <td>${this.strJam_masuk}</td>
          </tr>
          <tr>
            <td>Jumlah Presensi</td>
            <td>${this.jmlPresensi}</td>
          </tr>
          </table>
          
          
          <table>
          <td><vaadin-select id="absen" value="${this.kehadiran}" label="Kehadiran" placeholder="Pilih Kehadiran" .renderer="${this._boundSelectRenderer}" @change="${this.onChange}"></vaadin-select></td>
          <td><vaadin-button id="simpan" aria-label="Simpan" @click="${this._onSaveClicked}" theme="primary" focus-target>PRESENSI</vaadin-button></td>
          </table>
          </section>
         <vaadin-dialog .token="${this.token}" id="saveDialog" no-close-on-esc no-close-on-outside-click></vaadin-dialog> 
         <section>
          <vaadin-grid style="height: 120px;" .items="${this.absen}" .rowDetailsRenderer="${this.rowDetailsRenderer}">
          <vaadin-grid-column width="50px" flex-grow="0" header="#" .renderer="${this.indexRenderer}"></vaadin-grid-column>
          <vaadin-grid-column width="250px" flex-grow="0" path="nama" header="NAMA"></vaadin-grid-column>
          <vaadin-grid-column width="150px" flex-grow="0" path="strTanggal" header="TANGGAL"></vaadin-grid-column>
          <vaadin-grid-column width="150px" flex-grow="0" path="strJam_masuk" header="JAM MASUK"></vaadin-grid-column>
          <vaadin-grid-column width="150px" .token="${this.token}" .renderer="${this._editRenderer}"></vaadin-grid-column>
          </vaadin-grid>
          <table>
    
         </section>
         <vaadin-button aria-label="Refresh" @click="${this._onBackClicked}" theme="success primary" focus-target>Kembali</vaadin-button>
        </section>
          
         
        `
        }
        fetchAbsenSiswa() {
            const simpan = this.shadowRoot.querySelector("#simpan");
            this.id = this.getUrlVars().id;
            fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/getAbsenMahasiswaByIdAbsenDosen/" + this.token + "/" + this.id).then(r => r.json()).then(data => {
                this.id_absen_mahasiswa = data.id_absen_mahasiswa;
                this.nama = data.nama;
                this.tanggal = data.strTanggal;
                this.strJam_masuk = data.strJam_masuk;
                this.kehadiran = data.kehadiran;
                this.jmlPresensi = data.jmlPresensi;
                this.status_absen = data.status_absen;
                if (0 != this.status_absen) {
                    simpan.disabled = !0
                } // this.valid = data.valid;
                // //console.log(this.result);
                // if (this.valid == 0 || this.valid == 1 || this.valid == 3) {
                //   window.alert(
                //     "Pembayaran anda belum valid, silahkan menghubungi bagian keuangan, terimakasih"
                //   );
                // }
                if (0 == this.validasi || 1 == this.validasi || 3 == this.validasi) {
                    window.alert("Pembayaran anda belum valid, silahkan menghubungi bagian keuangan, terimakasih")
                }
            })
        }
        fetchAllAbsenMahasiswa() {
            const simpan = this.shadowRoot.querySelector("#simpan");
            this.id = this.getUrlVars().id;
            fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/listAbsenMahasiswaByIdAbsenDosen/" + this.token + "/" + this.id).then(r => r.json()).then(data => {
                this.absen = data.absenMahasiswa
            })
        }
        indexRenderer(root, column, rowData) {
            (0, _myApp.render)(_myApp.html$1` <div>${rowData.index+1}</div> `, root)
        }
        _boundSelectRenderer() {
            this.shadowRoot.host.renderer = function(root) {
                if (root.firstChild) {
                    return
                }
                const listBox = window.document.createElement("vaadin-list-box"),
                    items = [{
                        label: "Hadir",
                        textContent: "Hadir"
                    }, {
                        label: "Ijin",
                        textContent: "Ijin"
                    }, {
                        label: "Sakit",
                        textContent: "Sakit"
                    }, {
                        label: "Tugas Luar Kota",
                        textContent: "Tugas Luar Kota"
                    }];
                items.forEach(function(row) {
                    const item = window.document.createElement("vaadin-item");
                    item.textContent = row.textContent;
                    item.setAttribute("label", row.label);
                    listBox.appendChild(item)
                });
                root.appendChild(listBox)
            }
        }
        onChange(e) {
            this.kehadiran = e.target.value
        }
        _onSaveClicked() {
            const loading = this.shadowRoot.querySelectorAll("#loading");
            loading[0].open();
            console.log(this.validasi); // if (this.valid == 0 || this.valid == 1 || this.valid == 3) {
            //   window.alert(
            //     "Pembayaran anda belum valid, silahkan menghubungi bagian keuangan, terimakasih"
            //   );
            // }
            if (0 == this.validasi || 1 == this.validasi || 3 == this.validasi) {
                window.alert("Pembayaran anda belum valid, silahkan menghubungi bagian keuangan, terimakasih")
            }
            this.fetchSaveBap()
        }
        fetchSaveBap() {
            const loading = this.shadowRoot.querySelectorAll("#loading");
            var token = this.token;
            loading[0].open();
            this.id = this.getUrlVars().id;
            if (0 != this.aktif) {
                fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/saveAbsen/" + token, {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        id_absen_mahasiswa: this.id_absen_mahasiswa,
                        idAbsenDosen: this.id,
                        id_jadwal_kuliah: this.idJadwalKuliah,
                        kehadiran: this.kehadiran
                    })
                }).then(data => data.json()).then(data => {
                    if (0 == data) {
                        loading[0].close();
                        window.alert("Data berhasil disimpan...");
                        window.location.reload()
                    } else {
                        loading[0].close();
                        window.alert("Oops terjadi kesalahan, mohon periksa datanya kembali..")
                    }
                }).catch(function(error) {
                    loading[0].close();
                    console.log("Request failed", error)
                })
            } else {
                loading[0].close();
                window.alert("Maaf sesi kuliah sudah berakhir...")
            }
        }
        _onBackClicked() {
            window.location.replace("/jadwal")
        }
        switchPage(page) {
            this.page = page
        }
        _onDeleteClicked() {
            const token = this.token;
            var r = confirm("Apakah ingin menghapus presensi ?");
            if (!0 == r) {
                fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/deleteAbsen/" + token + "/" + this.id_absen_mahasiswa, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        token: this.token
                    })
                }).then(res => res.json()).then(res => { //console.log('Deleted:', res.message)
                    console.log(res);
                    if (1 == res) {
                        window.alert("Data berhasil dihapus..");
                        window.location.reload()
                    }
                    return res
                }).catch(err => console.error(err))
            } else {
                txt = "You pressed Cancel!"
            }
        }
        _editRenderer(root, column, rowData) {
            const token = this.token;
            let wrapper = root.firstElementChild;
            if (!wrapper) {
                root.innerHTML = "<div style=\"text-align: right\">" + "<vaadin-button aria-label=\"Delete\" theme=\"error primary\">" + "Batal" + "</vaadin-button>" + "</div>";
                wrapper = root.firstElementChild;
                const buttons = wrapper.querySelectorAll("vaadin-button"); // DELETE
                buttons[0].addEventListener("click", function() {
                    var id_absen_mahasiswa = rowData.item.id_absen_mahasiswa,
                        nama = rowData.item.nama,
                        txt, r = confirm("Apakah ingin menghaspus presensi " + nama + "?");
                    if (!0 == r) {
                        fetch("https://api.jakstik.ac.id/mahasiswa-web-api-rest/mahasiswa/deleteAbsen/" + token + "/" + id_absen_mahasiswa, {
                            method: "DELETE",
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/json; charset=utf-8"
                            },
                            body: JSON.stringify({
                                token: this.token
                            })
                        }).then(res => res.json()).then(res => { //console.log('Deleted:', res.message)
                            console.log(res);
                            if (1 == res) {
                                window.alert("Data berhasil dihapus..");
                                window.location.reload()
                            }
                            return res
                        }).catch(err => console.error(err))
                    } else {
                        txt = "You pressed Cancel!"
                    }
                })
            } // We reuse rendered content, but maintain a property with the index for actions
            wrapper.idx = rowData.index
        }
        updateTextFieldsVisibility(index, editing) {
            console.log("cek")
        }
    }
    window.customElements.define("my-beritaacara", MyBeritaAcara)
});