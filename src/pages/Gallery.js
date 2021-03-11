import React from "react"
import Card from "../components/Card"
import $ from "jquery"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Gallery extends React.Component{
    constructor(){
        super()
        this.state={
            buku: [ // buku array
                {
                    isbn: "11111", judul: "Haunted Pool", penulis: "Cantika Veronika",
                    penerbit: "CV Ih Serem", harga: 50000,
                    cover: "image/hauntedpool.jpg"
                },

                {
                    isbn: "22222", judul: "Lucid Dream", penulis: "Ziggy Zeovany",
                    penerbit: "CV Serem Amat", harga: 90000,
                    cover: "image/luciddream.jpg"
                },

                {
                    isbn: "33333", judul: "Ghost in Winter", penulis: "Sakti Mandraguna",
                    penerbit: "CV Ngeri Bos", harga: 70000,
                    cover: "image/ghostinwinter.jpg"
                },
            ],

            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword: "",
            filterBuku: []
        }

        this.state.filterBuku = this.state.buku
    }

    Add = () => {
        $("#modal_buku").modal("show")
        this.setState({
            isbn: Math.random(1,1000000), //generate
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"

        })
    }
    Edit = (item) => {
        $("#modal_buku").modal("show")
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        //menampung data state buku
        let tempBuku = this.state.buku

        if(this.state.action === "insert"){
            //menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        }else if(this.state.action === "update"){
            //menyimpan perubahan data
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn= this.state.isbn
            tempBuku[index].judul= this.state.judul
            tempBuku[index].penulis= this.state.penulis
            tempBuku[index].penerbit= this.state.penerbit
            tempBuku[index].cover= this.state.cover
            tempBuku[index].harga= this.state.harga
        }

        this.setState({buku : tempBuku})

        //menutup komponen modal_buku
        $("#modal_buku").modal("hide")
    }

    Drop = (item) => {
        //beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            //menghapus data
            let tempBuku = this.state.buku
            //posisi index data yang akan dihapus
            let index = tempBuku.indexOf(item)

            //hapus data
            tempBuku.splice(index, 1)

            this.setState({buku: tempBuku})
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                item.penulis.toLowerCase().includes(keyword) ||
                item.penerbit.toLowerCase().includes(keyword)
            })

            this.setState({filterBuku: result})
        }
    }
    render(){
        return(
            <div className="container">
                <input type="text" className="from-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {/* { this.state.buku.map((item, index) => ( */}
                    { this.state.filterBuku.map((item, index) => (
                        <Card 
                        judul={item.judul}
                        penulis={item.penulis}
                        penerbit={item.penerbit}
                        harga={item.harga}
                        cover={item.cover}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    )) }
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Buku
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.judul}
                                    onChange={ ev => this.setState({judul: ev.target.value}) }
                                    required />
                                    
                                    Penulis Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penulis}
                                    onChange={ ev => this.setState({penulis: ev.target.value}) }
                                    required />
                                    
                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penerbit}
                                    onChange={ ev => this.setState({penerbit: ev.target.value}) }
                                    required />
                                    
                                    Harga Buku
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Cover Buku
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.cover}
                                    onChange={ ev => this.setState({cover: ev.target.value}) }
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Gallery;