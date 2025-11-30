# Movie Ticket Booking System

# Sample movie data
movies = {
    "1": {"name": "Lucky Bhaskar", "price": 150},
    "2": {"name": "Farzi", "price": 180},
    "3": {"name": "Dr.Strange", "price": 200}
}

# Seat layout (5 rows x 5 columns)
seats = [["O" for _ in range(5)] for _ in range(5)]  # 'O' means available, 'X' means booked

# Store booked seats for receipt
booked_seats = []
customer_name = ""

def display_movies():
    print("\nAvailable Movies:")
    for key, movie in movies.items():
        print(f"{key}. {movie['name']} – ₹{movie['price']} per seat")

def display_seats():
    print("\nSeat Layout (O = Available, X = Booked):")
    print("    1   2   3   4   5")
    for i, row in enumerate(seats):
        row_label = chr(65 + i)  # Row labels A,B,C...
        display_row = []
        for j, seat in enumerate(row):
            label = f"{row_label}{j+1}"
            display_row.append(f"{label}:{seat}")
        print(f"{row_label}  {'  '.join(display_row)}")

def book_seat(row, col, movie_price):
    if seats[row][col] == "O":
        seats[row][col] = "X"
        seat_label = f"{chr(65 + row)}{col + 1}"
        booked_seats.append((seat_label, movie_price))
        print(f"✅ Seat {seat_label} booked successfully.")
    else:
        seat_label = f"{chr(65 + row)}{col + 1}"
        print(f"❌ Seat {seat_label} is already booked.")

def cancel_seat(row, col):
    if seats[row][col] == "X":
        seats[row][col] = "O"
        seat_label = f"{chr(65 + row)}{col + 1}"
        for i, (seat, _) in enumerate(booked_seats):
            if seat == seat_label:
                booked_seats.pop(i)
                break
        print(f"↩️ Seat {seat_label} canceled successfully.")
    else:
        print("❌ That seat is not booked yet.")

def print_receipt(movie_name):
    if not booked_seats:
        print("\n🧾 No seats booked.")
        return
    print("\n🧾 Booking Receipt")
    print(f"Customer Name: {customer_name}")
    print(f"Movie: {movie_name}")
    total = 0
    for seat, price in booked_seats:
        print(f"Seat {seat} - ₹{price}")
        total += price
    print(f"Total Amount: ₹{total}")

def main():
    global customer_name

    display_movies()
    movie_choice = input("Enter the movie number you want to watch: ").strip()

    # FIXED: Keep asking until valid movie number
    while movie_choice not in movies:
        print("❌ Invalid movie selection. Please try again.")
        movie_choice = input("Enter the movie number again: ").strip()

    selected_movie = movies[movie_choice]
    print(f"\n🎬 You selected: {selected_movie['name']}")

    while True:
        display_seats()
        action = input("\nChoose action: [B]ook seat(s), [C]ancel seat, [Q]uit: ").upper()

        if action == "Q":
            if booked_seats and not customer_name:
                customer_name = input("Enter your name for the receipt: ").strip()

            print_receipt(selected_movie['name'])
            print("🙏 Thank you for using CINEBOOK!")
            input("\nPress Enter to exit...")  # <-- Prevents EXE auto-close
            break

        elif action == "B":
            seat_inputs = input("Enter seat labels to book (e.g., A1 B2 C3): ").upper().split()
            for seat_input in seat_inputs:
                if (len(seat_input) < 2 or not seat_input[0].isalpha()
                        or not seat_input[1:].isdigit()):
                    print(f"❌ Invalid seat format: {seat_input}")
                    continue

                row = ord(seat_input[0]) - 65
                col = int(seat_input[1:]) - 1

                if row not in range(5) or col not in range(5):
                    print(f"❌ Seat does not exist: {seat_input}")
                    continue

                book_seat(row, col, selected_movie['price'])

            if booked_seats and not customer_name:
                customer_name = input("Enter your name for the booking: ").strip()

        elif action == "C":
            seat_input = input("Enter seat to cancel (e.g., B3): ").upper()

            if (len(seat_input) < 2 or not seat_input[0].isalpha()
                    or not seat_input[1:].isdigit()):
                print("Invalid seat format.")
                continue

            row = ord(seat_input[0]) - 65
            col = int(seat_input[1:]) - 1

            if row not in range(5) or col not in range(5):
                print("❌ Seat does not exist.")
                continue

            cancel_seat(row, col)

        else:
            print("❌ Invalid action. Try again.")

if __name__ == "__main__":
    main()
